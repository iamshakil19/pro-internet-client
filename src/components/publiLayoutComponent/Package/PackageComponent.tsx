"use client";

import PackageCard from "@/components/Package/PackageCard";
import { useGetAllPackageQuery } from "@/redux/api/packageApi";
import { useDebounced } from "@/redux/hooks";
import { IPackage } from "@/types";
import { Input, Select, Slider } from "antd";
import React, { useEffect, useState } from "react";
const PackageComponent = () => {
  const query: Record<string, any> = {};
  const [category, setCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  if (category !== "") {
    query["category"] = category;
  }

  const debouncedTerm = useDebounced({
    searchQuery: searchTerm,
    delay: 600,
  });

  if (!!debouncedTerm) {
    query["searchTerm"] = debouncedTerm;
  }

  const { data, isLoading } = useGetAllPackageQuery({ ...query });

  return (
    <div className="container p-5 mx-auto">
      <div className="mt-10 pb-3 border-b">
        <span className="font-semibold text-blue-500">PRICING PLANS</span>
        <h3 className="text-4xl font-bold">Choose the best plan</h3>
        <p className="text-lg font-medium mt-2">
          Honest and affordable pricing model to help you get started easily.
        </p>
        <div className="mt-10 flex justify-between items-center">
          <Select
            defaultValue={""}
            style={{ width: 120 }}
            onChange={(e) => {
              setCategory(e);
            }}
            options={[
              { value: "", label: "All" },
              { value: "web hosting", label: "Web Hosting" },
              { value: "cloud", label: "Cloud" },
            ]}
          />
          <Input
            type="text"
            size="large"
            value={searchTerm}
            placeholder="Search..."
            style={{
              width: "100%",
              maxWidth: "300px",
              margin: "5px 0px",
            }}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mb-10">
        {data?.package?.map((pack: any) => (
          <PackageCard pack={pack} />
        ))}
      </div>
    </div>
  );
};

export default PackageComponent;
