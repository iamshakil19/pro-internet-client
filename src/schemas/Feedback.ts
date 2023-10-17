import * as yup from "yup";

export const feedbackSchema = yup.object().shape({
    desc: yup.string().required("Description is required"),
});