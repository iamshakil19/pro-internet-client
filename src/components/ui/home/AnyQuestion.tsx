import React from "react";
import footerTopImage from "@/assets/footer-top.png";
import Image from "next/image";
import liveSupport from "@/assets/LiveChat.svg";
import emailSupport from "@/assets/EmailSupport.svg";
import daySupport from "@/assets/24x7-Helpdesk.svg";
const AnyQuestion = () => {
  const data = [
    { image: liveSupport, label: "Live Chat" },
    { image: emailSupport, label: "Email Support" },
    { image: daySupport, label: "24x7 Helpdesk" },
  ];
  return (
    <div className="bg-[#E5E7EB]">
      <div className="container p-5 py-10 lg:py-20 mx-auto">
        <div className="flex items-center ">
          <div className="flex-1">
            <h3 className="text-3xl lg:text-4xl font-bold">
              Do you have any questions?
            </h3>
            <h3 className="text-3xl lg:text-4xl font-bold">
              We are always here to answer you
            </h3>

            <p className="my-10">
              Get in touch with one of our specialists. We'll review your needs
              and offer Talk to one of our hosting specialists, who will review
              your needs and propose a hosting solution that will specifically
              suit the needs of your business.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {data?.map((item) => (
                <div className="w-40 mx-auto rounded-lg shadow-md bg-white flex flex-col justify-between">
                  <Image
                    alt=""
                    src={item.image}
                    className="mx-auto w-20  p-5"
                  />
                  <button className="w-full bg-blue-500 text-white py-2 font-semibold rounded-b-lg">
                    {item.label}
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="flex-1 hidden lg:block">
            <Image src={footerTopImage} alt="" className="mx-auto" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnyQuestion;
