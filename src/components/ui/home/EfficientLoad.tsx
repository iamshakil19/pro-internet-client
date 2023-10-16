import Image from "next/image";
import React from "react";
import security from "@/assets/security.svg";
import clock from "@/assets/clock.svg";
const EfficientLoad = () => {
  return (
    <div className="container p-5 mx-auto mt-10">
      <div className="flex justify-between items-center shadow-lg p-10 lg:p-20 rounded-lg">
        <div className="flex-1">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">
            Enjoy quick and efficient load times stand out{" "}
            <span className="text-blue-500">from the Pack</span>
          </h3>
          <p className="text-lg font-medium text-gray-600">
            We're constantly working to make your website perform smoothly. All
            of the websites we host have static and dynamic caching enabled,
            which makes them up to 20 times faster. Additionally, we preinstall
            the LiteSpeed Cache plugin, which offers out-of-the-box media and
            front-end optimizations, as well as environmental management for
            improved speed, in all instances.
          </p>
        </div>
        <div className="flex-1 hidden lg:block">
          <Image src={clock} className="max-w-sm mx-auto" alt="Clock" />
        </div>
      </div>
      <div className="flex justify-between items-center shadow-lg p-10 lg:p-20 rounded-lg mt-20">
        <div className="flex-1 hidden lg:block">
          <Image src={security} className="max-w-sm mx-auto" alt="Clock" />
        </div>
        <div className="flex-1">
          <h3 className="text-3xl lg:text-4xl font-bold mb-6">
            Security for you and <br />
            <span className="text-blue-500">your customers</span>
          </h3>
          <p className="text-lg font-medium text-gray-600">
            We're constantly working to make your website perform smoothly. All
            of the websites we host have static and dynamic caching enabled,
            which makes them up to 20 times faster. Additionally, we preinstall
            the LiteSpeed Cache plugin, which offers out-of-the-box media and
            front-end optimizations, as well as environmental management for
            improved speed, in all instances.
          </p>
        </div>
      </div>
    </div>
  );
};

export default EfficientLoad;
