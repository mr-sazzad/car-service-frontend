"use client";

import Loading from "@/app/loading";
import { useGetSingleUserQuery } from "@/app/redux/api/userApi";
import { convertToStars } from "@/app/utils/convertToStar";
import Image from "next/image";

const PersonCard = ({ rev }: { rev: any }) => {
  console.log(rev, "rev");
  const { data: user, isLoading } = useGetSingleUserQuery(rev?.userId);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="card card-compact w-full bg-base-100 shadow-xl border border-gray-300 relative">
      <div className="card-body">
        <div className="flex flex-row gap-3 items-center">
          <Image
            src={user?.profileImage}
            alt="profile-image"
            height={40}
            width={40}
            className="rounded-full border-2 border-gray-400 p-1"
          />
          <div>
            <p className="text-sm font-medium">{user?.name}</p>
            <p className="text-xs font-medium">
              {new Date(rev?.createdAt).toLocaleDateString()}
            </p>
            <p className="text-xs font-medium absolute top-5 right-5 px-2 py-[2px] border border-gray-300 rounded-full">
              {new Date(rev?.createdAt).toLocaleTimeString()}
            </p>
          </div>
        </div>

        <h2 className="text-orange-600 text-end text-xl font-medium">
          {convertToStars(rev?.rating)}
        </h2>
        <div className="card-actions justify-end">
          <div>
            <p className="text-sm font-medium">Review:</p>
            <p>{rev?.review}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonCard;
