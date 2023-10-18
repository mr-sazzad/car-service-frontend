"use client";

import Loading from "@/app/loading";
import {
  useGetSingleUserQuery,
  useUpdateUserMutation,
} from "@/app/redux/api/userApi";
import { getUserInfo } from "@/app/utils/auth";
import { hideEmail } from "@/app/utils/emailHide";
import Image from "next/image";
import { useForm } from "react-hook-form";

// const apiKey = process.env.IMGBB_API_KEY;

const Profile = () => {
  const { handleSubmit, register, reset } = useForm();
  const { userId } = getUserInfo() as any;

  const image_hosting_url = `https://api.imgbb.com/1/upload?key=9e675c9c7fab0ae39d3d5f4203858675`;

  const { data: user, isLoading } = useGetSingleUserQuery(userId);
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
        name: data.name || user.name,
        gender: data.gender || user.gender,
        contactNo: data.contactNo || user.contactNo,
        bloodGroup: data.bloodGroup || user.bloodGroup,
        profileImage: profileImage || user.profileImage,
      };

      await updateUser({ id: userId, ...updatedData });
    } catch (error) {
      console.error("Error occurred:", error);
    }
  };

  return (
    <div className="container mx-auto min-h-[80vh] my-5">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="flex flex-col lg:flex-row gap-3 w-full min-h-[70vh]">
          <div className="bg-gray-200 w-full lg:w-[250px] rounded-md">
            <div className="flex flex-col gap-3 mb-10">
              <div className="flex flex-col gap-1">
                <div className="flex justify-center mt-5">
                  <div>
                    <Image
                      src={
                        user?.profileImage
                          ? user?.profileImage
                          : "/assets/profileImage.png"
                      }
                      alt="profile-image"
                      height={100}
                      width={100}
                      className="flex justify-center items-center rounded-full p-1 border-2 border-gray-700"
                    />
                  </div>
                </div>
                <div className="flex justify-center text-sm">@{user?.name}</div>
              </div>
              <div className="ml-5 lg:ml-3 flex flex-col gap-3">
                <p className="text-lg font-medium text-gray-800">Information</p>
                <p>{user?.email && hideEmail(user?.email)}</p>
                <p className="text-sm">Gender: {user?.gender}</p>
                <p className="text-sm">Blood Group: {user?.bloodGroup}</p>
                <p className="text-sm">Contact: {user?.contactNo}</p>
                <p className="text-sm">
                  Logged In As{" "}
                  <span className="font-semibold">{user?.role}</span>
                </p>
              </div>
            </div>
          </div>
          <div className="bg-gray-200 flex-1 rounded-md p-5">
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
                        defaultValue={user?.name}
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
                        defaultValue={user?.gender || "Select your gender?"}
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
                        defaultValue={user?.email}
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
                        defaultValue={user?.contactNo}
                        className="p-2 outline-none border border-gray-500 rounded-md"
                        {...register("contactNo")}
                      />
                    </div>
                    <div className="flex flex-col gap-1 text-gray-500">
                      <label className="font-medium ml-2">Blood Group</label>
                      <select
                        className="select select-bordered w-full outline-none"
                        {...register("bloodGroup")}
                        defaultValue={user?.bloodGroup || "Select Your Blood Group"}
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
