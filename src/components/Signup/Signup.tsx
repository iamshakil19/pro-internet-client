"use client";
import { message } from "antd";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useLoginMutation, useSignupMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema, signUpSchema } from "@/schemas/login";
import Link from "next/link";
import { useEffect, useState } from "react";
import { getUploadUrl } from "@/helpers/config/envConfig";
import { USER_ROLE } from "@/constants/role";
import Image from "next/image";

type FormValues = {
  email: string;
  password: string;
};

const SignUpPage = () => {
  const [signup] = useSignupMutation();
  const router = useRouter();
  const [image, setImage] = useState("");

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await signup({
        ...data,
        image,
        role: USER_ROLE.USER,
      }).unwrap();
      if (res) {
        router.push("/login");
        message.success("Successfully registered!");
      }
    } catch (err: any) {
      message.error(err.message);
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
    <div className="flex min-h-[calc(100vh-64px)]">
      <div className="bg-blue-500 flex-1 items-center hidden lg:flex justify-center">
        <p className="text-5xl font-bold text-white">Pro Internet</p>
      </div>
      <div className="flex-1 p-5 flex flex-col justify-center">
        <h1 className="text-center text-2xl mb-5 font-bold">Create account</h1>
        <div className="mx-auto w-full max-w-sm">
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
          <p className="mt-5">
            Already have account ?{" "}
            <Link className="text-blue-500" href="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
