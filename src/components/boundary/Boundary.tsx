import React from "react";
import { Spin } from "antd";

interface PropsType {
  loading: boolean;
  error: string | null;
  render: () => JSX.Element;
}

export const Boundary: React.FC<PropsType> = ({ loading, error, render }) => {
  return loading ? (
    <Spin
      size="large"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
    />
  ) : error ? (
    <div>网站出错: {error}</div>
  ) : (
    render()
  );
};
