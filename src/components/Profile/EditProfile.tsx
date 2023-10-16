"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row, message } from "antd";
import React from "react";
import { updateProfileSchema } from "@/schemas/login";
import { useUpdateProfileMutation } from "@/redux/api/authApi";

const EditProfile = ({ setUpdateData, updateData }: any) => {
  const [updateProfile] = useUpdateProfileMutation();
  const onSubmit = async (values: any) => {
    message.loading({
      key: "updateProfile",
      content: "Updating...",
    });
    try {
      const res = await updateProfile( { id: updateData?.id, body: values } );
      if (res) {
        message.success({
          key: "updateProfile",
          content: "Successfully updated",
        });
        setUpdateData(null);
      }
    } catch (error: any) {
      message.error({
        key: "updateProfile",
        content: error.message,
      });
    }
  };

  const defaultValues = {
    name: updateData?.name || "",
    phone: updateData?.phone || "",
  };

  return (
    <div>
      <div>
        <Form
          submitHandler={onSubmit}
          defaultValues={defaultValues}
          resolver={yupResolver(updateProfileSchema)}
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
                  name="name"
                  size="large"
                  label="Package Name"
                  placeholder="Enter your name"
                  required
                />
              </Col>
              <Col
                className="gutter-row"
                span={24}
                style={{ marginBottom: "10px" }}
              >
                <FormInput
                  type="text"
                  name="phone"
                  size="large"
                  label="Phone"
                  placeholder="Enter phone number"
                  required
                />
              </Col>
            </Row>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold text-lg w-full text-center mx-auto py-1 rounded-md shadow-lg"
          >
            Update
          </button>
        </Form>
      </div>
    </div>
  );
};

export default EditProfile;
