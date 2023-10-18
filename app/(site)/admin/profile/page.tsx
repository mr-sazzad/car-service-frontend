"use client";

import Loading from "@/app/loading";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/app/redux/api/userApi";
import { getUserInfo } from "@/app/utils/auth";
import { hideEmail } from "@/app/utils/emailHide";
import { message } from "antd";
import Image from "next/image";
import { useForm } from "react-hook-form";

// const apiKey = process.env.IMGBB_API_KEY;

const Profile = () => {
  const { handleSubmit, register, reset } = useForm();
  const { userId } = getUserInfo() as any;

  const image_hosting_url = `https://api.imgbb.com/1/upload?key=9e675c9c7fab0ae39d3d5f4203858675`;

  const { data: currentUser, isLoading } = useGetSingleUserQuery(userId);
  const [updateUser] = useUpdateUserMutation();

  if (isLoading) {
    return <Loading />;
  }

  const handleUserUpdate = async (data: any) => {
    try {
      const formData = new FormData();
      formData.append("image", data.file[0]);

      const response = await fetch(image_hosting_url, {
        method: "POST",
        body: formData,
      });

      const imageResponse = await response.json();

      let profileImage = null;
      if (imageResponse?.success) {
        profileImage = imageResponse?.data?.display_url;
      }

      const updatedData = {
        name: data.name || currentUser.name,
        gender: data.gender || currentUser.gender,
        contactNo: data.contactNo || currentUser.contactNo,
        bloodGroup: data.bloodGroup || currentUser.bloodGroup,
        profileImage: profileImage || currentUser.profileImage,
      };

      const res = await updateUser({ id: userId, ...updatedData });

      if (res) {
        message.success("Profile updated")
      }

    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="container mx-auto min-h-[80vh] my-5">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="flex flex-col lg:flex-row gap-3 w-full min-h-[70vh]">
          <div className="bg-gray-100 w-full lg:w-[250px] rounded-md">
            <div className="flex flex-col gap-3 mb-10">
              <div className="flex flex-col gap-1">
                <div className="flex justify-center mt-5">
                  <div>
                    <Image
                      src={
                        currentUser?.profileImage
                          ? currentUser?.profileImage
                          : "/assets/profileImage.png"
                      }
                      alt="profile-image"
                      height={100}
                      width={100}
                      className="flex justify-center items-center rounded-full p-1 border-2 border-gray-700"
                    />
                  </div>
                </div>
                <div className="flex justify-center text-sm">
                  @{currentUser?.name}
                </div>
              </div>
              <div className="ml-5 lg:ml-3 flex flex-col gap-3">
                <p className="text-lg font-medium text-gray-800">Information</p>
                <p>{currentUser?.email && hideEmail(currentUser?.email)}</p>
                <p className="text-sm">Gender: {currentUser?.gender}</p>
                <p className="text-sm">
                  Blood Group: {currentUser?.bloodGroup}
                </p>
                <p className="text-sm">Contact: {currentUser?.contactNo}</p>
                <p className="text-sm">
                  Logged In As{" "}
                  <span className="font-semibold">{currentUser?.role}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 flex-1 rounded-md p-5">
            <div className="border border-gray-500 rounded-md">
              <p className="text-center text-lg font-medium my-5">
                Update Your Information
              </p>
              <form
                onSubmit={handleSubmit(handleUserUpdate)}
                className="flex justify-center item-center mb-5"
              >
                <div className="flex flex-col gap-3">
                  <div className="flex flex-row gap-5">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium ml-2 text-gray-500">
                        Name
                      </label>
                      <input
                        type="text"
                        defaultValue={currentUser?.name}
                        placeholder="Enter your name"
                        className="p-2 outline-none border border-gray-500 rounded-md"
                        {...register("name")}
                      />
                    </div>
                    <div className="flex flex-col gap-1 w-full">
                      <label className="font-medium ml-2 text-gray-500">
                        Gender
                      </label>
                      <select
                        className="select select-bordered w-full"
                        defaultValue={
                          currentUser?.gender || "Select your gender?"
                        }
                        {...register("gender")}
                      >
                        <option disabled>Select your gender?</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Others</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-1 text-gray-500">
                      <label className="font-medium ml-2">Email</label>
                      <input
                        type="text"
                        placeholder="Enter your email"
                        defaultValue={currentUser?.email}
                        className="p-2 outline-none border border-gray-500 rounded-md"
                        disabled
                      />
                    </div>
                  </div>
                  <div className="flex flex-row gap-5 text-gray-500">
                    <div className="flex flex-col gap-1">
                      <label className="font-medium ml-2">Contact No</label>
                      <input
                        type="text"
                        placeholder="Enter your contactNo"
                        defaultValue={currentUser?.contactNo}
                        className="p-2 outline-none border border-gray-500 rounded-md"
                        {...register("contactNo")}
                      />
                    </div>
                    <div className="flex flex-col gap-1 text-gray-500">
                      <label className="font-medium ml-2">Blood Group</label>
                      <select
                        className="select select-bordered w-full outline-none"
                        {...register("bloodGroup")}
                        defaultValue={
                          currentUser?.bloodGroup || "Select Your Blood Group"
                        }
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
                  <div>
                    <div className="flex flex-col gap-1 text-gray-500">
                      <label className="font-medium ml-2">Profile Image</label>
                      <input
                        type="file"
                        className="file-input w-full outline-none border border-gray-500 rounded-md"
                        {...register("file")}
                      />
                    </div>
                  </div>
                  <div>
                    <div className="flex mt-4">
                      <button className="p-2 bg-orange-500 hover:bg-orange-400 transition w-full rounded-md text-white font-medium">
                        Update Information
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
