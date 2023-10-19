"use client";

import React from "react";
import Form from "@/components/Forms/Form";
import { Col, Row, message } from "antd";
import FormTextArea from "../Forms/FormTextArea";
import { yupResolver } from "@hookform/resolvers/yup";
import FormDatePicker from "../Forms/FormDatePicker";
import { bookingSchema } from "@/schemas/Booking";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import dayjs from "dayjs";
import { useCreateBookingMutation } from "@/redux/api/bookingApi";
import { clearCart } from "@/redux/slice/bookingSlice";
import { getUserInfo, isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";

const AddBooking = ({ setBookingModalOpen }: any) => {
  const dispatch = useAppDispatch();
  const [createBooking] = useCreateBookingMutation();
  const { booking } = useAppSelector((state) => state.bookings);
  const packageIdArray = booking?.map((pack: any) => pack.id);
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const { email, role } = getUserInfo() as any;
  const onSubmit = async (values: any) => {
    if (!userLoggedIn) {
      message.error({
        key: "createBooking",
        content: "Login first",
      });
      router.push("/login");
      return;
    }

    if (role !== "user") {
      message.error({
        key: "createBooking",
        content: "Only for user",
      });
      setBookingModalOpen(false);
      dispatch(clearCart({}));
      return;
    }

    const tempObject = { ...values };
    tempObject["startDate"] = dayjs(tempObject["startDate"]).toISOString();

    message.loading({
      key: "createBooking",
      content: "Creating...",
    });
    try {
      const res = await createBooking({
        ...tempObject,
        packageIds: packageIdArray,
      });
      if (res) {
        message.success({
          key: "createBooking",
          content: "Successfully created",
        });
        dispatch(clearCart({}));
        setBookingModalOpen(false);
      }
    } catch (error: any) {
      message.error({
        key: "createBooking",
        content: error.message,
      });
    }
  };
  return (
    <div>
      <div>
        <Form submitHandler={onSubmit} resolver={yupResolver(bookingSchema)}>
          <div
            style={{
              padding: "15px",
              marginBottom: "10px",
            }}
          >
            <Col span={24} style={{ margin: "10px 0" }}>
              <FormDatePicker
                name="startDate"
                label="Start date"
                required
                placeholder="Select start date"
              />
            </Col>
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold text-lg w-full text-center mx-auto py-1 rounded-md shadow-lg"
          >
            Submit
          </button>
        </Form>
      </div>
    </div>
  );
};

export default AddBooking;
