import React from "react";
import { Row, Col, Image, Divider } from "antd";
import image1 from "assets/images/facebook-807588_640.png";
import image2 from "assets/images/follow-826033_640.png";
import image3 from "assets/images/icon-720944_640.png";
import image4 from "assets/images/microsoft-80658_640.png";

export const Partner: React.FC = () => {
  return (
    <div style={{ marginTop: 50 }}>
      <Divider orientation="left">
        <h2 style={{ color: "#aaa" }}>合作企业</h2>
      </Divider>
      <Row gutter={50}>
        <Col>
          <Image src={image1} width={270} height={135} />
        </Col>
        <Col>
          <Image src={image2} width={270} height={135} />
        </Col>
        <Col>
          <Image src={image3} width={270} height={135} />
        </Col>
        <Col>
          <Image src={image4} width={270} height={135} />
        </Col>
      </Row>
    </div>
  );
};
