"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelect from "@/components/Forms/FormSelectField";
// import { useAddAdminWithFormDataMutation } from "@/redux/api/adminApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row, message } from "antd";
import React from "react";
import FormTextArea from "../Forms/FormTextArea";
import { packageSchema } from "@/schemas/Package";
import { useCreatePackageMutation } from "@/redux/api/packageApi";
import { packageCategory } from "@/constants/global";

const AddPackage = ({ setAddPackageModal }: any) => {
  const [createPackage] = useCreatePackageMutation();
  const onSubmit = async (values: any) => {
    message.loading({
      key: "createPackage",
      content: "Creating...",
    });
    try {
      const res = await createPackage(values);
      if (res) {
        message.success({
          key: "createPackage",
          content: "Successfully created",
        });
        setAddPackageModal(false);
      }
    } catch (error: any) {
      message.error({
        key: "createPackage",
        content: error.message,
      });
    }
  };

  return (
    <div>
      <Form submitHandler={onSubmit} resolver={yupResolver(packageSchema)}>
        <div
          style={{
            padding: "15px",
            marginBottom: "10px",
          }}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col
              className="gutter-row"
              span={12}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="text"
                name="name"
                size="large"
                label="Package Name"
                placeholder="Enter package name"
                required
              />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="number"
                name="price"
                size="large"
                label="Price"
                placeholder="Enter price"
                required
              />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="number"
                name="renewsFee"
                size="large"
                label="Renews Fee"
                placeholder="Enter renews fee"
                required
              />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="text"
                name="storage"
                size="large"
                label="Storage"
                placeholder="Enter Storage"
                required
              />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{ marginBottom: "10px" }}
            >
              <FormSelect
                name="category"
                size="large"
                options={packageCategory}
                label="Category"
                placeholder="Select category"
                required
              />
            </Col>

            <Col
              className="gutter-row"
              span={12}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="text"
                name="bandwidth"
                size="large"
                label="Bandwidth"
                placeholder="Enter bandwidth"
                required
              />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="text"
                name="website"
                size="large"
                label="Website"
                placeholder="Enter website"
                required
              />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="text"
                name="cpu"
                size="large"
                label="CPU"
                placeholder="Enter cpu"
                required
              />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="text"
                name="physicalMemory"
                size="large"
                label="Physical Memory"
                placeholder="Enter physical memory"
                required
              />
            </Col>
            <Col
              className="gutter-row"
              span={12}
              style={{ marginBottom: "10px" }}
            >
              <FormInput
                type="text"
                name="process"
                size="large"
                label="Process"
                placeholder="Enter process"
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
                label="Short Description"
                placeholder="Enter short description"
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

export default AddPackage;
