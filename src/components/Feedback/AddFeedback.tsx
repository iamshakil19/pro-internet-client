"use client";

import React from "react";
import Form from "@/components/Forms/Form";
import { Col, Row, message } from "antd";
import FormTextArea from "../Forms/FormTextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import { feedbackSchema } from "@/schemas/Feedback";
import { useCreateFeedbackMutation } from "@/redux/api/feedbackApi";

const AddFeedback = ({ setAddFeedbackModal }: any) => {
  const [createFeedback] = useCreateFeedbackMutation();
  const onSubmit = async (values: any) => {
    message.loading({
      key: "createFeedback",
      content: "Creating...",
    });
    try {
      const res = await createFeedback(values);
      if (res) {
        message.success({
          key: "createFeedback",
          content: "Successfully created",
        });
        setAddFeedbackModal(false);
      }
    } catch (error: any) {
      message.error({
        key: "createFeedback",
        content: error.message,
      });
    }
  };
  return (
    <div>
      <div>
        <Form submitHandler={onSubmit} resolver={yupResolver(feedbackSchema)}>
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
                <FormTextArea
                  name="desc"
                  label="Feedback"
                  placeholder="Type your feedback"
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

export default AddFeedback;
