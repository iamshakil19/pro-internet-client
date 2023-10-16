import Image from "next/image";
import React from "react";
import freeSSL from "@/assets/offer/free-ssl.png";
import bdixTry from "@/assets/offer/bdix-try.jpg";
import amd from "@/assets/offer/amd.jpg";
const Offer = () => {
  return (
    <div className="container p-5 mx-auto mt-10">
      <div className="mb-10">
        <span className="font-semibold text-blue-500">PROMOTION</span>
        <h3 className="text-3xl font-bold">Offer & Promos</h3>
        <p className="text-lg font-medium">
          Hand-picked coupons, promo codes, discounts, and deals.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <Image
          className="w-full max-w-sm rounded-lg mx-auto"
          src={freeSSL}
          alt=""
        />
        <Image
          className="w-full max-w-sm rounded-lg mx-auto"
          src={bdixTry}
          alt=""
        />
        <Image
          className="w-full max-w-sm rounded-lg mx-auto"
          src={amd}
          alt=""
        />
      </div>
    </div>
  );
};

export default Offer;
