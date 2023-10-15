import React from "react";
import icon1 from "../../../assets/upcoming-service/icon1.png";
import icon2 from "../../../assets/upcoming-service/icon2.png";
import icon3 from "../../../assets/upcoming-service/icon3.png";
import icon4 from "../../../assets/upcoming-service/icon4.png";
import Image from "next/image";

const UpcomingService = () => {
  return (
    <div className="container p-5 mx-auto mt-5">
      <h2 className="mb-10 text-2xl font-bold">Upcoming Service</h2>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        <div
          className={`bg-[#EEF2FF] p-7 max-w-xs rounded-lg shadow-xl mx-auto text-center`}
        >
          <Image className="max-w-[70px] mx-auto" src={icon1} alt="" />

          <h2 className="text-xl font-bold mt-5">Dedicated Server (US)</h2>
          <p className="mt-2">
            Ideal for getting started before moving on to a more advanced
            hosting package
          </p>
          <p className="mt-4 text-lg">
            Starting at <br />{" "}
            <span className="text-2xl font-bold">12,500 BDT</span> /mo
          </p>

          <button
            className={`bg-gray-400 w-full cursor-not-allowed py-2.5 mt-4 rounded-md text-white font-bold`}
          >
            Upcoming
          </button>
        </div>
        <div
          className={`bg-[#F0FDF4] p-7 max-w-xs rounded-lg shadow-xl mx-auto text-center`}
        >
          <Image className="max-w-[70px] mx-auto" src={icon2} alt="" />

          <h2 className="text-xl font-bold mt-5">BDIX Windows VPS</h2>
          <p className="mt-2">
            Perfect for webmasters or those looking to launch a web hosting
            business.
          </p>
          <p className="mt-4 text-lg">
            Starting at <br />{" "}
            <span className="text-2xl font-bold">1550 BDT</span> /mo
          </p>

          <button
            className={`bg-gray-400 w-full cursor-not-allowed py-2.5 mt-4 rounded-md text-white font-bold`}
          >
            Upcoming
          </button>
        </div>
        <div
          className={`bg-[#FEFCE8] p-7 max-w-xs rounded-lg shadow-xl mx-auto text-center`}
        >
          <Image className="max-w-[70px] mx-auto" src={icon3} alt="" />

          <h2 className="text-xl font-bold mt-5">BDIX Managed VPS</h2>
          <p className="mt-2">
            Start with a VPS or benefit from the adaptability of our SSD VPS
            solutions.
          </p>
          <p className="mt-4 text-lg">
            Starting at <br />{" "}
            <span className="text-2xl font-bold">1800 BDT</span> /mo
          </p>

          <button
            className={`bg-gray-400 w-full cursor-not-allowed py-2.5 mt-4 rounded-md text-white font-bold`}
          >
            Upcoming
          </button>
        </div>
        <div
          className={`bg-[#EFF6FF] p-7 max-w-xs rounded-lg shadow-xl mx-auto text-center`}
        >
          <Image className="max-w-[70px] mx-auto" src={icon4} alt="" />

          <h2 className="text-xl font-bold mt-5">BDIX Unmanaged VPS</h2>
          <p className="mt-2">
            Grow your business site to the next top level with our popular VPS
            server plans.
          </p>
          <p className="mt-4 text-lg">
            Starting at <br />{" "}
            <span className="text-2xl font-bold">23,500 BDT</span> /mo
          </p>

          <button
            className={`bg-gray-400 w-full cursor-not-allowed py-2.5 mt-4 rounded-md text-white font-bold`}
          >
            Upcoming
          </button>
        </div>
      </div>
    </div>
  );
};

export default UpcomingService;
