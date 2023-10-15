import React from "react";
import shared from "../../../assets/available-service/shared.png";
import reseller from "../../../assets/available-service/reseller.png";
import domain from "../../../assets/available-service/domain.png";
import cloud from "../../../assets/available-service/managed-cloud.png";
import Image from "next/image";

const AvailableService = () => {
  return (
    <div className="container p-5 mx-auto">
      <h2 className="mb-10 text-2xl font-bold">Available Service</h2>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div
          className={`bg-[#EEF2FF] p-7 max-w-xs rounded-lg shadow-xl mx-auto text-center`}
        >
          <Image className="max-w-[80px] mx-auto" src={shared} alt="" />

          <h2 className="text-xl font-bold mt-5">Web Hosting</h2>
          <p className="mt-2">
            Ideal for getting started before moving on to a more advanced
            hosting package
          </p>
          <p className="mt-4 text-lg">
            Starting at <br />{" "}
            <span className="text-2xl font-bold">120 BDT</span> /mo
          </p>

          <button
            className={`bg-gradient-to-r from-[#6265F0] to-[#4339CA] w-full py-2.5 mt-4 rounded-md text-white font-bold`}
          >
            Get Started
          </button>
        </div>
        <div
          className={`bg-[#F0FDF4] p-7 max-w-xs rounded-lg shadow-xl mx-auto text-center`}
        >
          <Image className="max-w-[80px] mx-auto" src={reseller} alt="" />

          <h2 className="text-xl font-bold mt-5">Reseller Hosting</h2>
          <p className="mt-2">
            Perfect for webmasters or those looking to launch a web hosting
            business.
          </p>
          <p className="mt-4 text-lg">
            Starting at <br />{" "}
            <span className="text-2xl font-bold">1350 BDT</span> /mo
          </p>

          <button
            className={`bg-gradient-to-r from-[#22C25D] to-[#17843F] w-full py-2.5 mt-4 rounded-md text-white font-bold`}
          >
            Get Started
          </button>
        </div>
        <div
          className={`bg-[#FEFCE8] p-7 max-w-xs rounded-lg shadow-xl mx-auto text-center`}
        >
          <Image className="max-w-[80px] mx-auto" src={domain} alt="" />

          <h2 className="text-xl font-bold mt-5">Virtual Private Server</h2>
          <p className="mt-2">
            Start with a VPS or benefit from the adaptability of our SSD VPS
            solutions.
          </p>
          <p className="mt-4 text-lg">
            Starting at <br />{" "}
            <span className="text-2xl font-bold">1600 BDT</span> /mo
          </p>

          <button
            className={`bg-gradient-to-r from-[#F8CA15] to-[#CD8C07] w-full py-2.5 mt-4 rounded-md text-white font-bold`}
          >
            Get Started
          </button>
        </div>
        <div
          className={`bg-[#EFF6FF] p-7 max-w-xs rounded-lg shadow-xl mx-auto text-center`}
        >
          <Image className="max-w-[80px] mx-auto" src={cloud} alt="" />

          <h2 className="text-xl font-bold mt-5">Dedicated Server</h2>
          <p className="mt-2">
            Grow your business site to the next top level with our dedicated
            server plans.
          </p>
          <p className="mt-4 text-lg">
            Starting at <br />{" "}
            <span className="text-2xl font-bold">12,500 BDT</span> /mo
          </p>

          <button
            className={`bg-gradient-to-r from-[#3A80F4] to-[#1F51D9] w-full py-2.5 mt-4 rounded-md text-white font-bold`}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
};

export default AvailableService;
