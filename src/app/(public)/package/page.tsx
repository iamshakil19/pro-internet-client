"use client";

import PackageCard from "@/components/Package/PackageCard";
import { useGetAllPackageQuery } from "@/redux/api/packageApi";
import { IPackage } from "@/types";
import React from "react";

const PackagePage = () => {
  const { data, isLoading } = useGetAllPackageQuery({});
  console.log(data?.package);

  return (
    <div className="container p-5 mx-auto">
      <div className="mt-10 pb-10 border-b">
        <span className="font-semibold text-blue-500">PRICING PLANS</span>
        <h3 className="text-4xl font-bold">Choose the best plan</h3>
        <p className="text-lg font-medium mt-2">
          Honest and affordable pricing model to help you get started easily.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mt-10 mb-10">
        {data?.package?.map((pack: any) => (
          <PackageCard pack={pack} />
        ))}
      </div>
    </div>
  );
};

export default PackagePage;
