"use client";

import { useCreateNewServiceMutation } from "@/app/redux/api/services/serviceApi";
import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

import { BsArrowRightShort } from "react-icons/bs";

const AddNewService = () => {
  const { register, handleSubmit, reset } = useForm();

  const router = useRouter();

  const [createNewService, { isLoading }] = useCreateNewServiceMutation();

  const image_hosting_url = `https://api.imgbb.com/1/upload?key=9e675c9c7fab0ae39d3d5f4203858675`;

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("image", data.file[0]);

      const response = await fetch(image_hosting_url, {
        method: "POST",
        body: formData,
      });

      let imageUrl = null;
      if (response.ok) {
        const responseData = await response.json();
        imageUrl = responseData?.data?.display_url;

        const requestedData = {
          title: data.title,
          price: data.price,
          status: data.status,
          description: data.description,
          image: imageUrl,
        };
        const res = await createNewService(requestedData);

        if (res) {
          message.success("service created !");
          reset();
          setTimeout(() => {
            router.back();
          }, 1000);
        }
      } else {
        message.error("Network response was not ok");
      }
    } catch (err) {
      message.error("Something went wrong");
      console.error("Error:", err);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="mx-4 md:mx-8 lg:mx-10 my-5">
        <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
          <div className="flex-1">
            <div className="flex flex-col justify-center pl-[27%] h-full">
              <p className="text-5xl text-gray-700 font-bold">Add</p>
              <p className="text-5xl text-gray-700 font-bold">New Service</p>
              <Link href="/admin/management/service" className="mt-3">
                <p className="flex flex-row items-center gap-2 group">
                  Go to service page{" "}
                  <BsArrowRightShort className="group-hover:ml-[2px] transition group-hover:text-base text-base duration-500" />
                </p>
              </Link>
            </div>
          </div>
          <div className="flex-1 flex-col gap-3 w-full">
            <p className="text-center font-medium text-gray-500 mb-5 mt-5 lg:mt-0">
              Service Details
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col lg:flex-row gap-3 w-full">
                <div className="flex flex-col gap-1 mb-4 w-full">
                  <label htmlFor="serviceTitle ml-2">Service Title:</label>
                  <input
                    {...register("title", { required: true })}
                    type="text"
                    id="title"
                    className="border border-gray-400 outline-none h-[3rem] pl-2 rounded-[0.5rem]"
                  />
                </div>
                <div className="flex flex-col gap-1 mb-4 w-full">
                  <label htmlFor="price ml-2">Price:</label>
                  <input
                    {...register("price", { required: true })}
                    type="text"
                    id="price"
                    className="border border-gray-400 outline-none h-[3rem] pl-2 rounded-[0.5rem]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-4 w-full">
                <label htmlFor="price ml-2">Image:</label>
                <input
                  type="file"
                  className="file-input file-input-bordered"
                  {...register("file")}
                />
              </div>
              <div className="flex flex-col gap-1 mb-4 w-full">
                <label htmlFor="price ml-2">Status:</label>
                <select
                  className="select select-bordered w-full"
                  {...register("status")}
                  defaultValue="current"
                >
                  <option className="text-lg">current</option>
                  <option className="text-lg">up_coming</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="description ml-2">Description:</label>
                <textarea
                  rows={7}
                  {...register("description", { required: true })}
                  id="description"
                  className="border border-gray-600 outline-none pl-2 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-orange-500 hover:bg-orange-400 transition w-full text-white font-medium rounded-md"
              >
                {isLoading ? "Loading ... " : "Add New Service"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddNewService;
