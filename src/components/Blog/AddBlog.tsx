"use client";

import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { Col, Row, message } from "antd";
import FormTextArea from "../Forms/FormTextArea";
import { blogSchema } from "@/schemas/Blog";
import { getUploadUrl } from "@/helpers/config/envConfig";
import { useCreateBlogMutation } from "@/redux/api/blogApi";

const AddBlog = ({ setAddBlogModal }: any) => {
  const [createBlog] = useCreateBlogMutation();
  const [image, setImage] = useState("");
  const onSubmit = async (values: any) => {

    message.loading({
      key: "createBlog",
      content: "Creating...",
    });
    try {
      const res = await createBlog({ ...values, image });
      if (res) {
        message.success({
          key: "createBlog",
          content: "Successfully created",
        });
        setAddBlogModal(false);
      }
    } catch (error: any) {
      message.error({
        key: "createBlog",
        content: error.message,
      });
    }
  };

  const submitImage = (file: any) => {
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "xgys6tus");
    data.append("cloud_name", "de2t00kiz");
    fetch(getUploadUrl(), {
      method: "POST",
      body: data,
    })
      .then((response) => response.json())
      .then((data) => {
        setImage(data?.secure_url);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <div>
      <Form submitHandler={onSubmit} resolver={yupResolver(blogSchema)}>
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
            <Col
              className="gutter-row"
              span={24}
              style={{ marginBottom: "10px" }}
            >
              <input
                typeof="jpg"
                className="hidden"
                type="file"
                id="file"
                accept="image/png, image/jpeg"
                onChange={(e) => submitImage(e.target.files?.[0])}
              />
              <label htmlFor="file">
                {image !== "" ? (
                  <img
                    title="Upload Image"
                    className="w-full h-10 object-cover rounded-md mx-auto cursor-pointer"
                    src={image}
                    alt=""
                  />
                ) : (
                  <p className="bg-green-200 text-green-600 w-full text-center border-dashed border border-green-600 rounded-md py-1 mt-5 font-medium cursor-pointer">
                    Upload Image
                  </p>
                )}
              </label>
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

export default AddBlog;
