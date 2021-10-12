import React from "react";
import { PaymentForm, CheckOutCard } from "components";
import { MainLayout } from "layouts";
import { Col, Row } from "antd";
import { useSelector } from "store/hooks";
import { useDispatch } from "react-redux";
import { Dispatch } from "store";
import { placeOrder } from "store/order/slice";

export function PlaceOrderPage() {
  const { loading, currentOrder } = useSelector((state) => state.order);
  const dispatch = useDispatch<Dispatch>();

  return (
    <MainLayout>
      <Row>
        <Col span={12}>
          <PaymentForm />
        </Col>
        <Col span={12}>
          <CheckOutCard
            loading={loading}
            order={currentOrder}
            onCheckout={() => {
              dispatch(placeOrder({ orderId: currentOrder.id }));
            }}
          />
        </Col>
      </Row>
    </MainLayout>
  );
}
