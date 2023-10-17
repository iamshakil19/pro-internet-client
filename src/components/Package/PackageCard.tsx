"use client";

import React from "react";
import { CheckCircleOutlined } from "@ant-design/icons";

const PackageCard = ({ pack }: any) => {
  const {
    id,
    name,
    price,
    renewsFee,
    category,
    storage,
    bandwidth,
    website,
    cpu,
    physicalMemory,
    process,
    desc,
    createdAt,
    updatedAt,
  } = pack || {};
  return (
    <div className="w-full max-w-xs shadow-lg rounded-md mx-auto">
      <div className="bg-[#E6F1FF] p-5 rounded-md">
        <p className="text-center">
          <span className="bg-gray-400 text-white font-semibold text-lg text-center px-4 py-0.5 rounded-3xl mx-auto">
            {name}
          </span>
        </p>
        <p className="text-center mt-3 font-medium">
          <span className="text-3xl font-bold">TK {price}</span> /month
        </p>
        <p className="text-center mt-1 font-medium text-sm">{desc}</p>
        <p className="text-center border border-gray-300 rounded-full mt-2 py-0.5 text-sm">
          Renews at TK {renewsFee} /mo
        </p>
      </div>

      <div className="p-5">
        <div className="flex text-center gap-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>{storage} GB </strong>SSD Storage
          </span>
        </div>
        <div className="flex text-center gap-2 mt-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>{bandwidth} </strong>Bandwidth
          </span>
        </div>
        <div className="flex text-center gap-2 mt-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>{website}</strong>Website
          </span>
        </div>
        <div className="flex text-center gap-2 mt-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>{cpu} Core </strong>CPU
          </span>
        </div>
        <div className="flex text-center gap-2 mt-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>{physicalMemory} GB </strong>Physical Memory
          </span>
        </div>
        <div className="flex text-center gap-2 mt-2">
          <CheckCircleOutlined style={{ color: "green" }} />
          <span>
            <strong>{process} GB </strong>Entry Process
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
