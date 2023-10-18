"use client";

import Loading from "@/app/loading";
import { useGetAllBlogsQuery } from "@/app/redux/api/blogs/blogApi";
import { useGetAllFeedbacksQuery } from "@/app/redux/api/feedback/feedbackApi";
import { useGetAllAvailableServicesQuery } from "@/app/redux/api/services/serviceApi";
import { useGetAllUserQuery } from "@/app/redux/api/userApi";

const AdminDashboard = () => {
  const { data: users, isLoading: usersLoading } =
    useGetAllUserQuery(undefined);
  const { data: services, isLoading: servicesLoading } =
    useGetAllAvailableServicesQuery(undefined);

  const { data: blogs } = useGetAllBlogsQuery(undefined);
  const { data: feedbacks } = useGetAllFeedbacksQuery(undefined);

  if (usersLoading || servicesLoading) {
    <Loading />;
  }

  const totalUsers = users?.length;
  const totalServices = services?.length;

  const totalBlogs = blogs?.length;
  const totalFeedbacks = feedbacks?.length;

  return (
    <div className="container mx-auto">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="flex flex-col lg:flex-row justify-between items-center my-5 gap-3 w-full">
          <div className="flex flex-col lg:flex-row gap-3 w-full">
            <div className="w-full h-[100px] bg-green-300 p-5 rounded-md hover:bg-green-400 transition">
              <h2 className="text-2xl font-medium">Total Active Users</h2>
              <p className="text-3xl font-bold">
                {totalUsers >= 9
                  ? `${totalUsers}`
                  : totalUsers?.toString().padStart(2, "0")}
              </p>
            </div>
            <div className="w-full h-[100px] bg-indigo-300 p-5 rounded-md hover:bg-indigo-400 transition">
              <h2 className="text-2xl font-medium">Total Services</h2>
              <p className="text-3xl font-bold">
                {totalServices >= 9
                  ? `${totalServices}`
                  : totalServices?.toString().padStart(2, "0")}
              </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-3 w-full">
            <div className="w-full h-[100px] bg-green-300 p-5 rounded-md hover:bg-green-400 transition">
              <h2 className="text-2xl font-medium">We Got Feedbacks</h2>
              <p className="text-3xl font-bold">
                {" "}
                {totalFeedbacks >= 9
                  ? `${totalFeedbacks}`
                  : totalFeedbacks?.toString().padStart(2, "0")}
              </p>
            </div>
            <div className="w-full h-[100px] bg-indigo-300 p-5 rounded-md hover:bg-indigo-400 transition">
              <h2 className="text-2xl font-medium">Total Blogs</h2>
              <p className="text-3xl font-bold">
                {totalBlogs >= 9
                  ? `${totalBlogs}`
                  : totalBlogs?.toString().padStart(2, "0")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
