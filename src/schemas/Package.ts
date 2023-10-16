import * as yup from "yup";

export const packageSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    price: yup.number().required("Price is required"),
    renewsFee: yup.number().required("Renews fee is required"),
    storage: yup.string().required("Storage fee is required"),
    category: yup.string().required("Category is required"),
    bandwidth: yup.string().required("Bandwidth is required"),
    website: yup.string().required("Website is required"),
    cpu: yup.string().required("Cpu is required"),
    physicalMemory: yup.string().required("Physical memory is required"),
    process: yup.string().required("Process is required"),
    desc: yup.string().required("Description is required"),
});