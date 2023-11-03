"use client";

import { useCreateAdminMutation } from "@/app/redux/api/userApi";
import { message } from "antd";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const NewAdmin = () => {
  const { handleSubmit, register, reset } = useForm();
  const router = useRouter();

  const [createAdmin] = useCreateAdminMutation();

  const imageHostingUrl =
    "https://api.imgbb.com/1/upload?key=9e675c9c7fab0ae39d3d5f4203858675";

  const onSubmit = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("image", data.file[0]);

      let profileImage = "";

      const response = await fetch(imageHostingUrl as string, {
        method: "POST",
        body: formData,
      });
      const responseData = await response.json();
      profileImage = responseData?.data?.display_url;

      const createAdminData = {
        name: data.name,
        email: data.email,
        password: data.password,
        gender: data.gender,
        contactNo: data.contactNo,
        bloodGroup: data.bloodGroup,
        profileImage: profileImage,
        role: "admin",
      };

      const result: any = await createAdmin(createAdminData);

      if (result?.data?.success === false) {
        message.error("something went wrong");
        reset();
      } else {
        message.success("admin created");
        router.push("/super_admin/management/admin");
        reset();
      }
    } catch (err: any) {
      message.error("something went wrong");
    }
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="flex justify-between items-center">
          <div className="flex-1 hidden md:flex">
            <Image
              src="/assets/add-person.avif"
              alt="add-person-image"
              height={600}
              width={600}
            />
          </div>
          <div className="flex-1">
            <p className="text-center font-medium text-xl text-gray-600 mb-5">
              Add New Admin
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
              <div className="flex flex-col lg:flex-row lg:w-full lg:justify-between lg:gap-3">
                <div className="flex flex-col lg:w-full gap-1">
                  <label className="text-sm ml-2">Name*</label>
                  <input
                    type="text"
                    {...register("name", { required: true })}
                    className="h-[3rem] border border-gray-300 outline-none pl-[1rem] text-[0.875rem] rounded-[0.5rem] mb-4 w-full"
                  />
                </div>
                <div className="flex flex-col lg:w-full gap-1">
                  <label className="text-sm ml-2">Gender</label>
                  <select
                    className="select select-bordered w-full mb-4"
                    defaultValue="Male"
                    {...register("gender")}
                  >
                    <option disabled>Select your gender?</option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Others</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="text-sm ml-2">email*</label>
                <input
                  type="email"
                  {...register("email", { required: true })}
                  className="h-[3rem] border border-gray-300 outline-none pl-[1rem] text-[0.875rem] rounded-[0.5rem] mb-4 w-full"
                />
              </div>
              <div className="flex flex-col lg:flex-row lg:w-full lg:justify-between lg:items-center lg:gap-3">
                <div className="flex flex-col lg:w-full gap-1">
                  <label className="text-sm ml-2">password*</label>
                  <input
                    type="password"
                    {...register("password", { required: true })}
                    className="h-[3rem] border border-gray-300 outline-none pl-[1rem] text-[0.875rem] rounded-[0.5rem] mb-4 w-full"
                  />
                </div>
                <div className="flex flex-col gap-1 w-full text-gray-500">
                  <label className="text-sm ml-2">Blood Group</label>
                  <select
                    className="select select-bordered w-full outline-none mb-4"
                    {...register("bloodGroup")}
                    defaultValue="O+"
                  >
                    <option disabled>Select Your Blood Group</option>
                    <option>O+</option>
                    <option>O-</option>
                    <option>A+</option>
                    <option>A-</option>
                    <option>AB+</option>
                    <option>AB-</option>
                    <option>B+</option>
                    <option>B-</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-sm ml-2">Contact No</label>
                <input
                  type="text"
                  placeholder="Enter your contactNo"
                  className="h-[3rem] border border-gray-300 outline-none pl-[1rem] text-[0.875rem] rounded-[0.5rem] mb-4 w-full"
                  {...register("contactNo")}
                />
              </div>

              <div className="flex flex-col gap-1 text-gray-500">
                <label className="font-sm ml-2">Profile Image</label>
                <input
                  type="file"
                  className="file-input w-full outline-none border border-gray-300 rounded-md mb-4"
                  {...register("file")}
                />
              </div>

              <button
                type="submit"
                className="bg-orange-500 py-1 px-2 rounded-md text-white hover:bg-orange-600 transition h-[3rem] mt-5"
              >
                Add New Admin
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewAdmin;
