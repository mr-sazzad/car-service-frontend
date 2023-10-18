"use client";

import Loading from "@/app/loading";
import { useCreateBlogMutation } from "@/app/redux/api/blogs/blogApi";
import { message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const NewBlog = () => {
  const [createBlog, { isLoading }] = useCreateBlogMutation();

  const { register, handleSubmit, reset } = useForm();
  const router = useRouter();

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = async (data: any) => {
    if (data.title === "" || data.content === "") {
      return message.error(
        "Blog title and content cannot be empty. Please provide the necessary information."
      );
    }

    const res = await createBlog(data);

    if (res) {
      message.success("Blog created");

      reset();
      setTimeout(() => {
        router.back();
      },1000)
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="flex flex-col lg:flex-row gap-3 justify-between items-center p-5">
          <div className="flex-1 flex-col gap-2">
            <Image
              src="/assets/blog.gif"
              alt="blog-gif"
              height={600}
              width={800}
            />
          </div>
          <div className="flex-1 flex-col gap-3 w-full">
            <p className="text-center font-medium text-gray-500 mb-5 mt-5 lg:mt-0">
              Create New Blog
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col gap-1 mb-4 w-full">
                <label className="ml-2">Blog Title:</label>
                <input
                  {...register("title")}
                  type="text"
                  className="border border-gray-600 outline-none h-[3rem] pl-2 rounded-md"
                />
              </div>

              <div className="flex flex-col gap-1 mb-4">
                <label className="ml-2">Blog Content:</label>
                <textarea
                  rows={9}
                  {...register("content")}
                  className="border border-gray-600 outline-none p-2 rounded-md "
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-orange-500 hover:bg-orange-400 transition w-full text-white font-medium rounded-md"
              >
                Create New Blog
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
