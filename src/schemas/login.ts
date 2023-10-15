import * as yup from "yup";

export const loginSchema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup.string().min(6).max(32).required(),
});
export const signUpSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  phone: yup.string().required("Phone is required"),
  email: yup.string().required("Email is required"),
  password: yup.string().min(6).max(32).required(),
});
