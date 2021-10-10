import React, { useEffect } from "react";
import { useParams } from "react-router";
import { Boundary, ProductIntro, ProductComments } from "components";
import styles from "./DetailPage.module.scss";
import { Col, Row, DatePicker, Divider, Typography, Anchor, Menu } from "antd";
import { commentMockData } from "./mockup";
import { useSelector } from "store/hooks";
import { useDispatch } from "react-redux";
import { getProductDetail } from "store/productDetail/slice";
import { Dispatch } from "store";
import { MainLayout } from "layouts";

const { RangePicker } = DatePicker;

interface MatchParams {
  touristRouteId: string;
}

export const DetailPage: React.FC = () => {
  const { touristRouteId } = useParams<MatchParams>();
  const loading = useSelector((state) => state.productDetail.loading);
  const error = useSelector((state) => state.productDetail.error);
  const product = useSelector((state) => state.productDetail.data);

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
