"use client";

import React, { useState } from "react";
import type { CollapseProps } from "antd";
import { Collapse, theme } from "antd";
import { CaretRightOutlined } from "@ant-design/icons";
import type { CSSProperties } from "react";
import { useGetAllFaqQuery } from "@/redux/api/faqApi";
import PIModal from "@/components/ui/Modal";
import AddFaq from "@/components/Faq/AddFaq";

const FaqComponents = () => {
  const [addFaqModal, setAddFaqModal] = useState<boolean>(false);
  const { data } = useGetAllFaqQuery(undefined);
  const { faq } = data || {};

  const getItems: (panelStyle: CSSProperties) => CollapseProps["items"] = (
    panelStyle
  ) => {
    return faq?.map((item: any) => ({
      key: item.id,
      label: item.title,
      children: <p>{item.desc}</p>,
      style: panelStyle,
    }));
  };

  const { token } = theme.useToken();

  const panelStyle: React.CSSProperties = {
    marginBottom: 25,
    background: "#EEF2FF",
    padding: "10px",
    fontSize: "16px",
    width: " 100%",
    border: "1px solid ",
    borderRadius: token.borderRadiusLG,
  };

  return (
    <div className="mx-auto container p-5">
      <div className="mb-5 flex justify-end">
        <button
          onClick={() => setAddFaqModal(true)}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md"
        >
          Add FAQ
        </button>
      </div>
      <div className="mx-auto max-w-3xl">
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

      <PIModal
        showCancelButton={false}
        showOkButton={false}
        isOpen={addFaqModal}
        closeModal={() => setAddFaqModal(false)}
        title="Add Faq"
      >
        <AddFaq setAddFaqModal={setAddFaqModal} />
      </PIModal>
    </div>
  );
};

export default FaqComponents;
