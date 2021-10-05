import React from "react";
import { Layout, Typography } from "antd";

export const Footer: React.FC = () => {
  return (
    <Layout.Footer>
      <Typography.Title style={{ textAlign: "center" }} level={3}>
        版权所有 @ React 旅游网
      </Typography.Title>
    </Layout.Footer>
  );
};
