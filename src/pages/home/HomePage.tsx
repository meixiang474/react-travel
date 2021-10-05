import React from "react";
import { Header, Footer, Carousel, SideMenu, Partner } from "components";
import { Col, Row, Typography } from "antd";
import { productList1, productList2, productList3 } from "pages/home/mockup";
import sideImage from "assets/images/sider_2019_12-09.png";
import sideImage2 from "assets/images/sider_2019_02-04.png";
import sideImage3 from "assets/images/sider_2019_02-04-2.png";
import { ProductCollection } from "components";
import styles from "./HomePage.module.scss";

export class HomePage extends React.Component {
  render() {
    return (
      <>
        <Header />
        {/* 页面内容 content */}
        <div className={styles["page-content"]}>
          <Row style={{ marginTop: 20 }}>
            <Col span={6}>
              <div>
                <SideMenu />
              </div>
            </Col>
            <Col span={18}>
              <div>
                <Carousel />
              </div>
            </Col>
          </Row>
          <ProductCollection
            title={
              <Typography.Title level={3} type="warning">
                爆款推荐
              </Typography.Title>
            }
            sideImage={sideImage}
            products={productList1}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="danger">
                新品上市
              </Typography.Title>
            }
            sideImage={sideImage2}
            products={productList2}
          />
          <ProductCollection
            title={
              <Typography.Title level={3} type="success">
                国内游推荐
              </Typography.Title>
            }
            sideImage={sideImage3}
            products={productList3}
          />
          <Partner />
        </div>
        <Footer />
      </>
    );
  }
}
