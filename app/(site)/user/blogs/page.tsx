"use client";

import { blogsBreadPoints } from "@/app/constants/breakpoints";
import Loading from "@/app/loading";
import { useGetAllBlogsQuery } from "@/app/redux/api/blogs/blogApi";
import { IBlog } from "@/app/types";
import BlogCard from "@/components/blog/BlogCard";
import Masonry from "react-masonry-css";

const Blogs = () => {
  const { data: blogs, isLoading } = useGetAllBlogsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto my-5">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="h-[150px] w-full bg-gray-50 flex justify-center items-center mb-5">
          <h1 className="text-center text-4xl font-semibold text-orange-600 my-5 hover:text-5xl transition-all ease-in duration-300">
            # blogs
          </h1>
        </div>
        <div className="flex justify-center">
          <Masonry
            breakpointCols={blogsBreadPoints}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {blogs?.map((blog: IBlog) => (
              <div key={blog.id}>
                <BlogCard data={blog} />
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default Blogs;
