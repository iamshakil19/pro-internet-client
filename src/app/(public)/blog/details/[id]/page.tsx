"use client";

import { useGetSingleBlogQuery } from "@/redux/api/blogApi";
import Image from "next/image";
import React from "react";
import blog from "@/assets/blog.webp";
const BlogDetails = ({ params }: any) => {
  console.log(params);

  const { data } = useGetSingleBlogQuery(params.id);

  return (
    <div className="container mx-auto p-5 mt-10">
      <div className="max-w-4xl mx-auto">
        <div className="relative h-60">
          <Image
            src={data?.image ? data?.image : blog}
            alt=""
            fill={true}
            className="object-cover"
          />
        </div>
        <p className="mt-10 font-medium">{data?.desc}</p>
      </div>
    </div>
  );
};

export default BlogDetails;
