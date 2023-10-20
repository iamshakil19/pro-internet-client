"use client";

import { Row, Space, Spin } from "antd";
import React from "react";

const LoadingComponent = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
      }}
    >
      <Space>
        <Spin tip="Loading" size="large"></Spin>
      </Space>
    </Row>
  );
};

export default LoadingComponent;
