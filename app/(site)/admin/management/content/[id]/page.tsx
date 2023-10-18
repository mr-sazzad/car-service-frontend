"use client";

import Loading from "@/app/loading";
import {
  useGetSingleBlogQuery,
  useUpdateSingleBlogMutation,
} from "@/app/redux/api/blogs/blogApi";
import { message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const UpdateBlog = () => {
  const { id } = useParams();
  const { data: blog, isLoading } = useGetSingleBlogQuery(id);
  const [updateSingleBlog] = useUpdateSingleBlogMutation();
  const router = useRouter();

  const { register, handleSubmit, reset } = useForm();

  if (isLoading) {
    <Loading />;
  }

  const onSubmit = async (data: any) => {
    if (data.title === "" || data.content === "") {
      return message.error(
        "Not modified at all or cannot update due to empty input."
      );
    }

    const res = await updateSingleBlog({ id, data });

    if (res) {
      message.success("Blog Modified");
      reset();

      setTimeout(() => {
        router.back();
      }, 1000);
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="flex flex-col lg:flex-row gap-3 justify-between items-center p-5">
          <div className="flex-1 flex-col gap-2">
            <p className="text-center font-medium mb-5 text-gray-500">
              Blog Details
            </p>
            <div>
              <p className="font-medium text-base text-gray-500 gap-2 mb-2 flex flex-col lg:flex-row">
                Blog Title: <span className="text-black">{blog?.title}</span>
              </p>
            </div>
            <div className="mt-5">
              <p className="flex flex-col gap-2">
                Blog Content: <span>{blog?.content}</span>
              </p>
            </div>
            <div className="flex">
              <span
                className="text-sm mt-5 px-5 py-2 rounded-full bg-orange-400 font-medium text-white hover:bg-orange-600/50 transition tooltip tooltip-[gray-300]"
                data-tip="service id"
              >
                {blog?.id}
              </span>
            </div>
          </div>
          <div className="flex-1 flex-col gap-3 w-full">
            <p className="text-center font-medium text-gray-500 mb-5 mt-5 lg:mt-0">
              Update Blog Contents
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-1 mb-4 w-full">
                <label className="ml-2">Blog Title:</label>
                <input
                  defaultValue={blog?.title}
                  {...register("title")}
                  type="text"
                  className="border border-gray-600 outline-none h-[3rem] pl-2 rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1 mb-4">
                <label className="ml-2">Blog Content:</label>
                <textarea
                  defaultValue={blog?.content}
                  rows={9}
                  {...register("content")}
                  className="border border-gray-600 outline-none p-2 rounded-md "
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-orange-500 hover:bg-orange-400 transition w-full text-white font-medium rounded-md"
              >
                Update This Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateBlog;
