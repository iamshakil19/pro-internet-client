"use client";

import React from "react";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CSSProperties } from "react";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
  panelStyle
) => [
  {
    key: "1",
    label: "This is panel header 1",
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: "2",
    label: "This is panel header 2",
    children: <p>{text}</p>,
    style: panelStyle,
  },
  {
    key: "3",
    label: "This is panel header 3",
    children: <p>{text}</p>,
    style: panelStyle,
  },
];

const FaqPage = () => {
  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 25,
    background: "#EEF2FF",
    padding: "10px",
    fontSize: "16px",
    width: " 100%",
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div className="mt-10 lg:mt-20 mx-auto container p-5">
      <div className="mx-auto max-w-3xl">
        <div className="mb-10 ">
          <span className="font-semibold text-blue-500">OUR FAQ'S</span>
          <h3 className="text-4xl font-bold">Explore FAQ's</h3>
          <p className="text-lg font-medium mt-2">
            Find the answers to frequently asked questions.
          </p>
        </div>

        <Collapse
          bordered={false}
          defaultActiveKey={["1"]}
          expandIcon={({ isActive }) => (
            <CaretRightOutlined
              rotate={isActive ? 90 : 0}
              style={{ color: "blue", fontSize: "17px" }}
            />
          )}
          className="max-w-3xl"
          style={{ background: "transparent" }}
          items={getItems(panelStyle)}
        />
      </div>
    </div>
  );
};

export default FaqPage;
