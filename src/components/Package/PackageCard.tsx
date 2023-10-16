"use client";

import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

const PackageCard = () => {
  return (
    <div className="w-full max-w-xs shadow-lg rounded-md">
      <div className="bg-[#E6F1FF] p-5 rounded-md">
        <p className="bg-gray-400 text-white font-semibold text-lg text-center px-4 py-0.5 rounded-3xl w-14 mx-auto">
          Go
        </p>
        <p className="text-center mt-3 font-medium">
          <span className="text-3xl font-bold">TK 120</span> /month
        </p>
        <p className="text-center mt-1 font-medium text-sm">
          Perfect for small websites
        </p>
      </div>

      <div className="p-5">
        <div className="flex text-center gap-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>1 GB </strong>SSD Storage
          </span>
        </div>
        <div className="flex text-center gap-2 mt-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>1 GB </strong>SSD Storage
          </span>
        </div>
        <div className="flex text-center gap-2 mt-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>1 GB </strong>SSD Storage
          </span>
        </div>
        <div className="flex text-center gap-2 mt-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>1 GB </strong>SSD Storage
          </span>
        </div>
        <div className="flex text-center gap-2 mt-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>1 GB </strong>SSD Storage
          </span>
        </div>
        <div className="flex text-center gap-2 mt-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>1 GB </strong>SSD Storage
          </span>
        </div>
        <div className="flex text-center gap-2 mt-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>1 GB </strong>SSD Storage
          </span>
        </div>
      </div>
      <div className="p-5">
        <button className="w-full bg-blue-500 text-white font-semibold text-lg py-1 rounded-md shadow-lg">
          Book Now
        </button>
        <button className="w-full bg-black text-white font-semibold text-lg py-1 rounded-md shadow-lg mt-3">
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default PackageCard;
