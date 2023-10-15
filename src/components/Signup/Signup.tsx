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

type FormValues = {
  email: string;
  password: string;
};

const SignUpPage = () => {
  const [login] = useLoginMutation();
  const router = useRouter();

  // console.log(isLoggedIn());

  const onSubmit: SubmitHandler<FormValues> = async (data: any) => {
    console.log(data);
    try {
    //   const res = await login({ ...data }).unwrap();
    //   console.log(res);
    //   if (res?.accessToken) {
    //     router.push("/profile");
    //     message.success("User logged in successfully!");
    //   }
    //   storeUserInfo({ accessToken: res?.accessToken });
    } catch (err: any) {
      console.error(err.message);
    }
  };

  return (
    <div
      className="flex"
      style={{
        minHeight: "100vh",
      }}
    >
      <div className="bg-blue-500 min-h-screen flex-1 items-center hidden lg:flex justify-center">
        <p className="text-5xl font-bold text-white">Pro Internet</p>
      </div>
      <div className="flex-1 p-5 flex flex-col justify-center">
        <h1 className="text-center text-2xl mb-5 font-bold">Create account</h1>
        <div className="mx-auto w-full max-w-sm">
          <Form submitHandler={onSubmit} resolver={yupResolver(loginSchema)}>
            <div>
              <FormInput
                name="name"
                type="text"
                size="large"
                label="Name"
                required
              />
            </div>
            <div className="mt-3">
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
                name="phone"
                type="text"
                size="large"
                label="Phone"
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
