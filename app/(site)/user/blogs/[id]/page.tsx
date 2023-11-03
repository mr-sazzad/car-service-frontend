"use client";

import Loading from "@/app/loading";
import { useGetSingleBlogQuery } from "@/app/redux/api/blogs/blogApi";
import Image from "next/image";
import { useParams } from "next/navigation";
import React from "react";

const FullBlog = () => {
  const { id } = useParams();

  const { data: blog, isLoading } = useGetSingleBlogQuery(id);

  if (isLoading) {
    return <Loading />;
  }

  console.log(id, "id");

  console.log(blog, "blog");

  return (
    <div className="mt-5">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="h-[150px] w-full bg-gray-50 flex justify-center items-center mb-5">
          <h1 className="text-center text-4xl font-semibold text-orange-600 my-5 hover:text-5xl transition-all ease-in duration-300">
            # blog
          </h1>
        </div>
        {/* content part */}
        <div className="max-w-[600px] mx-auto">
          <div className="flex flex-col gap-5">
            <div className="flex justify-center">
              <div className="w-[400px] h-[250px] relative">
                <Image
                  src={blog?.image}
                  alt="blog-image"
                  fill
                  objectFit="cover"
                />
              </div>
            </div>
            <div>
              <h2 className="my-3 text-2xl md:text-3xl font-semibold">
                {blog?.title}
              </h2>
              <p className="text-gray-700">{blog?.content}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullBlog;
