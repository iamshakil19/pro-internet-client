import * as yup from "yup";

export const bookingSchema = yup.object().shape({
    startDate: yup.string().required("Start date is required"),
});