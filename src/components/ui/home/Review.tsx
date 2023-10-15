"use client";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React from "react";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const instructors = [
  {
    _id: 1,
    name: "Dr. Alice Johnson",
    expertise: "Computer Science",
    bio: "Dr. Johnson is a renowned computer scientist with years of experience in teaching programming and data structures.",
  },
  {
    _id: 2,
    name: "John Smith",
    expertise: "Software Engineering",
    bio: "John is a software engineer with expertise in Java and software design. He is passionate about helping students succeed in their careers.",
  },
  {
    _id: 3,
    name: "Shakil Ahmed",
    expertise: "Software Engineering",
    bio: "John is a software engineer with expertise in Java and software design. He is passionate about helping students succeed in their careers.",
  },
  // Add more instructors as needed
];

const Review = () => {
  return (
    <div className="mt-20 container p-5 mx-auto">
      <div className="border-t border"></div>

      <div className="p-5 lg:p-20 lg:flex justify-between items-center">
        <div>
          <h3 className="text-5xl lg:text-6xl text-blue-500 font-bold">
            5000+
          </h3>
          <h4 className="text-3xl font-bold mt-2">Clients believe on us</h4>
          <p className="max-w-lg my-5 text-lg">
            We hosted more than 5000 happy customers. Small website to high
            traffic website customers.
          </p>
          <button className="bg-black text-white py-2.5 px-5 w-32 font-bold rounded-md shadow-lg">
            Get Started
          </button>
        </div>
        <div className="lg:flex-1 mt-10 max-w-xl">
          <Carousel
            responsive={responsive}
            draggable={false}
            swipeable={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={5000}
            arrows={false}
            slidesToSlide={2}
          >
            {instructors?.map((data) => (
              <div className="mx-auto m-10">
                <div className="shadow-lg min-h-[220px] bg-white hover:scale-105 transition-all duration-200 rounded-lg ring-1 ring-[#a2c1cc3f] p-5 mx-5">
                  <Avatar className="mb-5" size={50} icon={<UserOutlined />} />
                  <p>{data.bio}</p>

                  <p className="font-bold text-xl text-slate-500 mt-3">
                    {data.name}
                  </p>
                  <p className="text-slate-400 font-medium text-sm mt-1">
                    {data.expertise}
                  </p>
                  <p className="mt-2">⭐⭐⭐⭐⭐</p>
                </div>
              </div>
            ))}
          </Carousel>
        </div>
      </div>
    </div>
  );
};

export default Review;
