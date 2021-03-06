import React from "react";
import { Carousel, SideMenu, Partner } from "components";
import { Col, Row, Typography } from "antd";
import sideImage from "assets/images/sider_2019_12-09.png";
import sideImage2 from "assets/images/sider_2019_02-04.png";
import sideImage3 from "assets/images/sider_2019_02-04-2.png";
import { ProductCollection, Boundary } from "components";
import { withTranslation, WithTranslation } from "react-i18next";
import { connect } from "react-redux";
import { Dispatch, RootState } from "store";
import { fetchRecommendProductsActionCreator } from "store/recommendProducts/actions";
import { MainLayout } from "layouts";

interface Props
  extends ReturnType<typeof mapStateToProps>,
    ReturnType<typeof mapDispatchToProps>,
    WithTranslation {}

const mapStateToProps = (state: RootState) => {
  return {
    loading: state.recommendProducts.loading,
    error: state.recommendProducts.error,
    productList: state.recommendProducts.productList,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    fetchRecommendProducts: () => {
      dispatch(fetchRecommendProductsActionCreator());
    },
  };
};

class HomePageComponent extends React.Component<Props> {
  componentDidMount() {
    if (this.props.productList.length > 0) return;
    this.props.fetchRecommendProducts();
  }

  render() {
    const { t } = this.props;
    const { productList, loading, error } = this.props;
    return (
      <Boundary
        loading={loading}
        error={error}
        render={() => (
          <MainLayout>
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
                  {t("home_page.hot_recommended")}
                </Typography.Title>
              }
              sideImage={sideImage}
              products={productList[0].touristRoutes}
            />
            <ProductCollection
              title={
                <Typography.Title level={3} type="danger">
                  {t("home_page.new_arrival")}
                </Typography.Title>
              }
              sideImage={sideImage2}
              products={productList[1].touristRoutes}
            />
            <ProductCollection
              title={
                <Typography.Title level={3} type="success">
                  {t("home_page.domestic_travel")}
                </Typography.Title>
              }
              sideImage={sideImage3}
              products={productList[2].touristRoutes}
            />
            <Partner />
          </MainLayout>
        )}
      />
    );
  }
}

export const HomePage = connect(
  mapStateToProps,
  mapDispatchToProps
)(withTranslation()(HomePageComponent));
