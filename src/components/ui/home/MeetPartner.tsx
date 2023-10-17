"use client";

import React from "react";
import webuzo from "@/assets/meet-partner/webuzo.png";
import virtualizor from "@/assets/meet-partner/virtualizor.png";
import proxmax from "@/assets/meet-partner/proxmox.png";
import liteSpeed from "@/assets/meet-partner/litespeed.png";
import juniper from "@/assets/meet-partner/juniper.png";
import directAdmin from "@/assets/meet-partner/directadmin.png";
import cyberPanel from "@/assets/meet-partner/cyberpanellogo.png";
import cpanel from "@/assets/meet-partner/cpanel.png";
import cloudLinux from "@/assets/meet-partner/cloudlinux.png";
import apnic from "@/assets/meet-partner/apnic.png";
import Image from "next/image";
const MeetPartner = () => {
  const images = [
    webuzo,
    virtualizor,
    proxmax,
    liteSpeed,
    juniper,
    directAdmin,
    cyberPanel,
    cpanel,
    cloudLinux,
    apnic,
  ];
  return (
    <div className="container mx-auto p-5 mt-10 mb-20">
      <div className="mb-10">
        <span className="font-semibold text-blue-500">
          PRO INTERNET'S PARTNERS
        </span>
        <h3 className="text-4xl font-bold">Meet Partner's</h3>
        <p className="text-lg font-medium mt-2">
          We collaborate with a wide range of extraordinary companies.
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10">
        {images.map((image) => (
          <div className="w-48 py-3 px-7 shadow-lg flex justify-center items-center rounded-lg mx-auto">
            <Image src={image} alt="" className="w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MeetPartner;
