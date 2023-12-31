"use client";
import { message } from "antd";
import Form from "@/components/Forms/Form";
import FormInput from "@/components/Forms/FormInput";
import { SubmitHandler } from "react-hook-form";
import { useLoginMutation } from "@/redux/api/authApi";
import { storeUserInfo } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "@/schemas/login";
import Link from "next/link";
import { useEffect } from "react";

type FormValues = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const [login, { data, isSuccess, isError, error }] = useLoginMutation();
  const router = useRouter();

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    try {
      const res = await login({ ...data }).unwrap();
      if (res?.accessToken) {
        router.push("/profile");
        message.success("User logged in successfully!");
        storeUserInfo({ accessToken: res?.accessToken });
      }
      console.log(res);
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div className="flex  min-h-[calc(100vh-64px)]">
      <div className="bg-blue-500 flex-1 items-center hidden lg:flex justify-center">
        <p className="text-5xl font-bold text-white">Pro Internet</p>
      </div>
      <div className="flex-1 p-5 flex flex-col justify-center">
        <h1 className="text-center text-2xl mb-5 font-bold">
          Login your account
        </h1>
        <div className="mx-auto w-full max-w-sm">
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div>
              <FormInput
                name="email"
                type="email"
                size="large"
                label="Email"
                required
              />
            </div>
            <div className="mt-3">
              <FormInput
                name="password"
                type="password"
                size="large"
                label="Password"
                required
              />
            </div>
            {/* <Button type="primary" htmlType="submit">
              Login
            </Button> */}
            <button
              type="submit"
              className="bg-blue-500 mt-5 w-full py-1.5 text-white font-semibold rounded-md shadow-lg"
            >
              Login
            </button>
          </Form>
          <p className="mt-5">
            Need Account ?{" "}
            <Link className="text-blue-500" href="/signup">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
