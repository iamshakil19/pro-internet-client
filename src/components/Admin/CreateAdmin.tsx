"use client";

import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import FormSelect from "@/components/Forms/FormSelectField";
// import { useAddAdminWithFormDataMutation } from "@/redux/api/adminApi";
import { yupResolver } from "@hookform/resolvers/yup";
import { Col, Row, message } from "antd";
import React, { useState } from "react";
import FormTextArea from "../Forms/FormTextArea";
import { packageSchema } from "@/schemas/Package";
import { useCreatePackageMutation } from "@/redux/api/packageApi";
import { packageCategory } from "@/constants/global";
import { signUpSchema } from "@/schemas/login";
import { getUploadUrl } from "@/helpers/config/envConfig";
import { useSignupMutation } from "@/redux/api/authApi";
import { USER_ROLE } from "@/constants/role";

const CreateAdmin = ({ setCreateAdminModal }: any) => {
  const [createPackage] = useCreatePackageMutation();
  const [image, setImage] = useState("");
  const [signup] = useSignupMutation();

  const onSubmit = async (values: any) => {
    message.loading({
      key: "createPackage",
      content: "Creating...",
    });
    try {
      const res = await signup({
        ...values,
        image,
        role: USER_ROLE.ADMIN,
      });
      if (res) {
        message.success({
          key: "createPackage",
          content: "Successfully created",
        });
        setCreateAdminModal(false);
      }
    } catch (error: any) {
      message.error({
        key: "createPackage",
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
      <div>
        <Form submitHandler={onSubmit} resolver={yupResolver(signUpSchema)}>
          <div>
            <FormInput
              name="name"
              type="text"
              size="large"
              label="Name"
              required
              placeholder="Enter your name"
            />
          </div>
          <div className="mt-3">
            <FormInput
              name="email"
              type="email"
              size="large"
              label="Email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div className="mt-3">
            <FormInput
              name="phone"
              type="text"
              size="large"
              label="Phone"
              required
              placeholder="Enter your number"
            />
          </div>
          <div className="mt-3">
            <FormInput
              name="password"
              type="password"
              size="large"
              label="Password"
              required
              placeholder="Enter password"
            />
          </div>
          <div className="mt-3">
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
          </div>
          <button
            type="submit"
            className="bg-blue-500 mt-5 w-full py-1.5 text-white font-semibold rounded-md shadow-lg"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default CreateAdmin;
