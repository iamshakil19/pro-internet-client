"use client";

import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { Col, Row, message } from "antd";
import FormTextArea from "../Forms/FormTextArea";
import { blogSchema } from "@/schemas/Blog";
import { useUpdateBlogMutation } from "@/redux/api/blogApi";

const EditBlog = ({ setUpdateData, updateData }: any) => {
  const [updateBlog] = useUpdateBlogMutation();
  const onSubmit = async (values: any) => {
    const { id, ...data } = values;
    message.loading({
      key: "updateBlog",
      content: "Creating...",
    });
    try {
      const res = await updateBlog({ id, body: data });
      if (res) {
        message.success({
          key: "updateBlog",
          content: "Successfully created",
        });
        setUpdateData(false);
      }
    } catch (error: any) {
      message.error({
        key: "updateBlog",
        content: error.message,
      });
    }
  };

  return (
    <div>
      <Form
        submitHandler={onSubmit}
        defaultValues={updateData}
        resolver={yupResolver(blogSchema)}
      >
        <div
          style={{
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
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
                placeholder="Enter title"
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
                placeholder="Enter description"
                required
              />
            </Col>
          </Row>
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white font-semibold text-lg w-full text-center mx-auto py-1 rounded-md shadow-lg"
        >
          Create
        </button>
      </Form>
    </div>
  );
};

export default EditBlog;
