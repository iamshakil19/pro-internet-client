import Image from "next/image";
import React from "react";
import HeroImage from "../../../assets/hero.svg";
import comImg from "../../../assets/com.png";
import netImg from "../../../assets/net.png";
import orgImg from "../../../assets/org.png";
const HeroSection = () => {
  return (
    <div className="container flex justify-center flex-col lg:items-center p-5 min-h-screen mx-auto">
      <div className="flex justify-between mt-10 lg:mt-0 lg:items-center">
        <div className="flex-1 mx-auto">
          <h2 className="text-4xl font-bold mb-2">
            Build, expand your website
          </h2>
          <h2 className="text-4xl font-bold text-blue-500">without sweating</h2>

          <p className="text-lg font-medium max-w-xl mt-6">
            Enjoy amazing speed and security for your website on a powerful
            hosting platform recommended by many professionals and trusted by
            5,000+ users.
          </p>

          <div className="flex gap-3 mt-10">
            <button className="bg-black text-white py-2.5 px-5 w-32 font-bold rounded-md shadow-lg">
              Get Started
            </button>
            <button className="bg-blue-500 text-white py-2.5 px-5 w-32 font-bold rounded-md shadow-lg">
              Live Chat
            </button>
          </div>
        </div>
        <div className="flex-1 hidden lg:block">
          <Image
            className="mx-auto"
            src={HeroImage}
            height={600}
            width={600}
            alt=""
          />
        </div>
      </div>

      <div className="bg-black lg:bg-[#EFF6FF] p-8 shadow-xl rounded-lg mt-20 w-full max-w-5xl lg:flex items-center justify-between">
        <div className="flex flex-col lg:flex-row items-center">
          <input
            type="text"
            placeholder="Domain name"
            className=" py-2 px-3 lg:ml-2 w-full lg:max-w-sm rounded-md mb-3 lg:mb-0 outline-none"
          />
          <button className="bg-blue-500 text-white py-2 px-3 rounded-md lg:ml-2 w-full lg:w-20 lg:h-10">
            Search
          </button>
        </div>

        <div className="hidden lg:flex gap-5">
          <div className="flex items-center">
            <Image src={comImg} height={100} width={100} alt="" />
            <p className="font-medium">TK1,517.00</p>
          </div>
          <div className="flex items-center">
            <Image src={netImg} height={70} width={70} alt="" />
            <p className="font-medium">TK1,659.90</p>
          </div>
          <div className="flex items-center">
            <Image src={comImg} height={100} width={100} alt="" />
            <p className="font-medium">TK1,703.90</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
