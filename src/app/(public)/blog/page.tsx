"use client";

import React from "react";
import blog from "@/assets/blog.webp";
import { useGetAllBlogQuery } from "@/redux/api/blogApi";
import Image from "next/image";
import Link from "next/link";
const BlogPage = () => {
  const { data } = useGetAllBlogQuery({});
  return (
    <div className="container p-5 mx-auto">
      <div className="mt-10 pb-10 border-b">
        <span className="font-semibold text-blue-500">OUR BLOGS</span>
        <h3 className="text-4xl font-bold">Learn new tech</h3>
        <p className="text-lg font-medium mt-2">
          This will help you to grow more in professional life.
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 mx-auto gap-10">
        {data?.blog?.map((item: any) => (
          <Link href={`/blog/details/${item?.id}`}>
            <div className=" w-full h-full max-w-xs border-gray-200 border bg-white rounded-md shadow-lg cursor-pointer mx-auto">
              <div className="h-[240px] relative">
                <Image
                  src={item.image ? item.image : blog}
                  alt=""
                  fill={true}
                  className="w-full rounded-t-lg object-cover"
                />
              </div>

              <div className="p-5">
                <h3 className="text-lg font-bold">
                  {item?.title?.length > 50
                    ? item?.title?.slice(0, 50) + "..."
                    : item?.title}
                </h3>

                <p className="mt-3 text-base">
                  {item?.desc?.length > 100
                    ? item?.desc?.slice(0, 100) + "..."
                    : item?.desc}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
