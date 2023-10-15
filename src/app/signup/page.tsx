import SignUpPage from "@/components/Signup/Signup";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sing Up | Pro Internet",
  description: "Pro Internet Sign Up Page",
};

const Login = () => {
  return (
    <>
      <SignUpPage />
    </>
  );
};

export default Login;
