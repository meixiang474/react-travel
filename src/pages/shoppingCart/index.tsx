import React from "react";
import styles from "./index.module.scss";
import { MainLayout } from "layouts";
import { Row, Col, Affix, message } from "antd";
import { ProductList, PaymentCard } from "components";
import { clearShoppingCartItem, checkout } from "store/shoppingCart/slice";
import { useSelector } from "store/hooks";
import { useDispatch } from "react-redux";
import { Dispatch } from "store";
import { useHistory } from "react-router";

export function ShoppingCartPage() {
  const { loading, items } = useSelector((state) => state.shoppingCart);
  const dispatch = useDispatch<Dispatch>();

  const history = useHistory();

  return (
    <MainLayout>
      <Row>
        {/* 购物车清单 */}
        <Col span={16}>
          <div className={styles["product-list-container"]}>
            <ProductList data={items.map((item) => item.touristRoute)} />
          </div>
        </Col>
        {/* 支付卡 */}
        <Col span={8}>
          <Affix>
            <div className={styles["payment-card-container"]}>
              <PaymentCard
                loading={loading}
                originalPrice={items
                  .map((item) => item.originalPrice)
                  .reduce((a, b) => a + b, 0)}
                price={items
                  .map(
                    (item) =>
                      item.originalPrice *
                      (item.discountPresent ? item.discountPresent : 1)
                  )
                  .reduce((a, b) => a + b, 0)}
                onCheckout={async () => {
                  if (items.length <= 0) return;
                  const action = (await dispatch(checkout())) as any;
                  if (action.error) {
                    message.error("下单失败");
                    return;
                  }
                  history.push("/placeOrder");
                }}
                onShoppingCartClear={() => {
                  dispatch(
                    clearShoppingCartItem({
                      itemIds: items.map((item) => item.id),
                    })
                  );
                }}
              />
            </div>
          </Affix>
        </Col>
      </Row>
    </MainLayout>
  );
}
