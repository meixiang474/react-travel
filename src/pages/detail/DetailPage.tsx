import React, { useEffect } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Boundary, ProductIntro, ProductComments } from "components";
import styles from "./DetailPage.module.scss";
import {
  Col,
  Row,
  DatePicker,
  Divider,
  Typography,
  Anchor,
  Menu,
  Button,
} from "antd";
import { commentMockData } from "./mockup";
import { useSelector } from "store/hooks";
import { useDispatch } from "react-redux";
import { getProductDetail } from "store/productDetail/slice";
import { Dispatch } from "store";
import { MainLayout } from "layouts";
import { ShoppingCartOutlined } from "@ant-design/icons";
import { addShoppingCartItem } from "store/shoppingCart/slice";

const { RangePicker } = DatePicker;

interface MatchParams {
  touristRouteId: string;
}

export const DetailPage: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const { touristRouteId } = useParams<MatchParams>();
  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);

  const { token } = useSelector((state) => state.user);

  const { loading: shoppingCartLoading } = useSelector(
    (state) => state.shoppingCart
  );

  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch(getProductDetail(touristRouteId));
  }, [touristRouteId, dispatch]);

  return (
    <Boundary
      loading={loading}
      error={error}
      render={() => (
        <MainLayout>
          {/* 产品简介与日期选择 */}
          <div className={styles["product-intro-container"]}>
            <Row>
              <Col span={13}>
                <ProductIntro
                  title={product.title}
                  shortDescription={product.description}
                  price={product.originalPrice}
                  coupons={product.coupons}
                  points={product.points}
                  discount={product.price}
                  rating={product.rating}
                  pictures={product.touristRoutePictures.map((p: any) => p.url)}
                />
              </Col>
              <Col span={11}>
                <Button
                  style={{ marginTop: 50, marginBottom: 30, display: "block" }}
                  type="primary"
                  danger
                  loading={shoppingCartLoading}
                  onClick={() => {
                    if (token == null) {
                      history.push({
                        pathname: "/signIn",
                        state: { from: location.pathname },
                      });
                    } else {
                      dispatch(
                        addShoppingCartItem({ touristRouteId: product.id })
                      );
                    }
                  }}
                >
                  <ShoppingCartOutlined />
                  放入购物车
                </Button>
                <RangePicker open style={{ marginTop: 20 }} />
              </Col>
            </Row>
          </div>
          {/* 导航菜单 */}
          <Anchor className={styles["product-detail-anchor"]}>
            <Menu mode="horizontal">
              <Menu.Item key="1">
                <Anchor.Link href="#feature" title="产品特色"></Anchor.Link>
              </Menu.Item>
              <Menu.Item key="3">
                <Anchor.Link href="#fees" title="费用"></Anchor.Link>
              </Menu.Item>
              <Menu.Item key="4">
                <Anchor.Link href="#notes" title="预订须知"></Anchor.Link>
              </Menu.Item>
              <Menu.Item key="5">
                <Anchor.Link href="#comments" title="用户评价"></Anchor.Link>
              </Menu.Item>
            </Menu>
          </Anchor>
          {/* 产品特色 */}
          <div id="feature" className={styles["product-detail-container"]}>
            <Divider orientation="center">
              <Typography.Title level={3}>产品特色</Typography.Title>
            </Divider>
            <div
              dangerouslySetInnerHTML={{ __html: product.features }}
              style={{ margin: 50 }}
            ></div>
          </div>
          {/* 费用 */}
          <div id="fees" className={styles["product-detail-container"]}>
            <Divider orientation="center">
              <Typography.Title level={3}>产品费用</Typography.Title>
            </Divider>
            <div
              dangerouslySetInnerHTML={{ __html: product.fees }}
              style={{ margin: 50 }}
            ></div>
          </div>
          {/* 预定须知 */}
          <div id="notes" className={styles["product-detail-container"]}>
            <Divider orientation="center">
              <Typography.Title level={3}>预定须知</Typography.Title>
            </Divider>
            <div
              dangerouslySetInnerHTML={{ __html: product.notes }}
              style={{ margin: 50 }}
            ></div>
          </div>
          {/* 评价 */}
          <div id="comments" className={styles["product-detail-container"]}>
            <Divider orientation="center">
              <Typography.Title level={3}>用户评价</Typography.Title>
            </Divider>
            <div style={{ margin: 40 }}>
              <ProductComments data={commentMockData} />
            </div>
          </div>
        </MainLayout>
      )}
    />
  );
};
