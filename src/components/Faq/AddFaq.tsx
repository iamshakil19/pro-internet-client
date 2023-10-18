"use client";

import React from "react";
import Form from "@/components/Forms/Form";
import { faqSchema } from "@/schemas/Faq";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row, message } from "antd";
import FormTextArea from "../Forms/FormTextArea";
import { useCreateFaqMutation } from "@/redux/api/faqApi";
import FormInput from "../Forms/FormInput";

const AddFaq = ({ setAddFaqModal }: any) => {
  const [createFaq] = useCreateFaqMutation();
  const onSubmit = async (values: any) => {
    message.loading({
      key: "createFaq",
      content: "Creating...",
    });
    try {
      const res = await createFaq(values);
      if (res) {
        message.success({
          key: "createFaq",
          content: "Successfully created",
        });
        setAddFaqModal(false);
      }
    } catch (error: any) {
      message.error({
        key: "createFaq",
        content: error.message,
      });
    }
  };

  return (
    <div>
      <div>
        <Form submitHandler={onSubmit} resolver={yupResolver(faqSchema)}>
          <div
            style={{
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <Row>
              <Col
                className="gutter-row"
                span={24}
                style={{ marginBottom: "10px" }}
              >
                <FormInput
                  type="text"
                  name="title"
                  size="large"
                  label="Title"
                  placeholder="Enter title name"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={24}
                style={{ marginBottom: "10px" }}
              >
                <FormTextArea
                  name="desc"
                  label="Description"
                  placeholder="Type your description"
                  required
                />
              </Col>
            </Row>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold text-lg w-full text-center mx-auto py-1 rounded-md shadow-lg"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default AddFaq;
