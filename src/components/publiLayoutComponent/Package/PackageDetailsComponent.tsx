"use client";

import { useGetSinglePackageQuery } from "@/redux/api/packageApi";
import React, { useState } from "react";
import { Input, Rate, message } from "antd";
import Image from "next/image";
import avatar from "@/assets/avatar.jpg";

import { useCreateRatingMutation } from "@/redux/api/ratingApi";
import { isLoggedIn } from "@/services/auth.service";
import { useRouter } from "next/navigation";
import { useGetAllBookingQuery } from "@/redux/api/bookingApi";
const { TextArea } = Input;

const PackageDetailsComponent = ({params}: any) => {
  const userLoggedIn = isLoggedIn();
  const router = useRouter();
  const { data } = useGetSinglePackageQuery(params?.id);
  const [createRating] = useCreateRatingMutation();
  const { data: bookingData, isLoading } = useGetAllBookingQuery({});
  const {
    id,
    name,
    desc: description,
    cpu,
    category,
    bandwidth,
    price,
    renewsFee,
    storage,
    website,
    physicalMemory,
    process,
  } = data || {};
  const [rating, setRating] = useState(3);
  const [desc, setDesc] = useState("");

  const onSubmit = async () => {
    if (!userLoggedIn) {
      message.error({
        key: "createRating",
        content: "Login first",
      });
      router.push("/login");
      return;
    }
    message.loading({
      key: "createRating",
      content: "Creating...",
    });
    try {
      const res = await createRating({
        rate: rating,
        desc: desc,
        packageId: id,
      });
      if (res) {
        message.success({
          key: "createRating",
          content: "Successfully created",
        });
        setDesc("");
        setRating(3);
      }
    } catch (error: any) {
      message.error({
        key: "createRating",
        content: error.message,
      });
    }
  };
  const idExists = bookingData?.booking?.some(
    (obj: any) => obj?.package?.id === id
  );
  return (
    <div className="container mx-auto p-5">
      <div className="max-w-2xl mx-auto flex justify-evenly gap-10 shadow-md p-5 rounded-lg">
        <div className="">
          <p className="mb-1">
            Name :{" "}
            <span className="text-lg font-semibold capitalize">{name}</span>
          </p>
          <p className="mb-1">
            Price :{" "}
            <span className="text-lg font-semibold capitalize">{price}</span>
          </p>
          <p className="mb-1">
            Renews Fee :{" "}
            <span className="text-lg font-semibold capitalize">
              {renewsFee}
            </span>
          </p>
          <p className="mb-1">
            Storage :{" "}
            <span className="text-lg font-semibold capitalize">{storage}</span>
          </p>
          <p className="mb-1">
            Storage :{" "}
            <span className="text-lg font-semibold capitalize">{website}</span>
          </p>
          <p className="mb-1">
            Storage :{" "}
            <span className="text-lg font-semibold capitalize">{desc}</span>
          </p>
        </div>
        <div>
          <p className="mb-1">
            Category :{" "}
            <span className="text-lg font-semibold capitalize">{category}</span>
          </p>
          <p className="mb-1">
            Bandwidth :{" "}
            <span className="text-lg font-semibold capitalize">
              {bandwidth}
            </span>
          </p>
          <p className="mb-1">
            Bandwidth :{" "}
            <span className="text-lg font-semibold capitalize">{process}</span>
          </p>
          <p className="mb-1">
            Bandwidth :{" "}
            <span className="text-lg font-semibold capitalize">
              {physicalMemory}
            </span>
          </p>
        </div>
      </div>

      {isLoggedIn() && idExists && (
        <div className="border-t border-gray-300 mt-14 p-5">
          <div className="max-w-lg mx-auto mt-10">
            <div className="flex justify-between items-center mb-2">
              <p className="font-medium">Write Review</p>
              <Rate
                onChange={(e) => setRating(e)}
                style={{ color: "orange" }}
                allowHalf
                value={rating}
                defaultValue={3}
              />
            </div>
            <TextArea
              rows={4}
              placeholder="Write your comment"
              allowClear
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              style={{ border: "1px solid gray" }}
            />
            <button
              onClick={onSubmit}
              className="mt-5 bg-blue-500 text-base font-medium px-5 py-1 text-white float-right rounded-md shadow-md"
            >
              Submit
            </button>
          </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto mt-20">
        <h3 className="text-lg font-bold">Review and rating </h3>

        <div className="bg-[#EFF6FF] mt-5 p-5 rounded-md hover:ring-1">
          <div className="flex justify-between gap-10">
            <div className="flex gap-5">
              <div>
                <Image
                  width={50}
                  height={50}
                  className="border rounded-full shadow-md"
                  src={avatar}
                  alt=""
                />
              </div>
              <div>
                <p className="font-semibold">Nina Holloway</p>
                <p className="text-sm">20 Aug 2017</p>
              </div>
            </div>
            <div>
              <Rate
                style={{ color: "orange" }}
                allowHalf
                disabled
                defaultValue={3.5}
              />
            </div>
          </div>
          <p className="mt-4">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iste ipsam
            dolorum ducimus incidunt at suscipit laborum velit vitae. Maiores
            illum voluptas commodi ullam exercitationem iure vero totam atque
            pariatur obcaecati?
          </p>
        </div>
      </div>
    </div>
  );
};

export default PackageDetailsComponent;
