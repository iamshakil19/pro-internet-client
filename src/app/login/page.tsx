import LoginPage from "@/components/Login/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Pro Internet",
  description: "Pro Internet Login Page",
};

const Login = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default Login;
