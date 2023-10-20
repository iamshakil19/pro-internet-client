import React from "react";
import { Row } from "antd";


const ErrorComponent = () => {
  return (
    <Row
      justify="center"
      align="middle"
      style={{
        height: "100vh",
        color: "red",
      }}
    >
      <h1>Something Went Wrong!</h1>
    </Row>
  );
};

export default ErrorComponent;
