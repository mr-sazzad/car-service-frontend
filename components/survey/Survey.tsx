"use client";

import Loading from "@/app/loading";
import { useGetAllAvailableServicesQuery } from "@/app/redux/api/services/serviceApi";
import { useGetAllUserQuery } from "@/app/redux/api/userApi";

const Survey = ({}) => {
  const { data: users, isLoading } = useGetAllUserQuery(undefined);
  const { data: services, isLoading: servicesLoading } =
    useGetAllAvailableServicesQuery(undefined);

  if (isLoading || servicesLoading) {
    return <Loading />;
  }

  const totalUsers = users?.length;
  const totalServices = services?.length;

  return (
    <div className="container mx-auto">
      <div className="mx-4 md:mx-8 lg:mx-10 mb-10 flex flex-col gap-3">
        <div className="h-[150px] w-full bg-gray-50 flex justify-center items-center">
          <h1 className="text-center text-4xl font-semibold text-orange-600 my-5 hover:text-5xl transition-all ease-in duration-300">
            # Survey Section
          </h1>
        </div>
        <div className="flex flex-col lg:flex-row justify-between items-center my-5 gap-3 w-full">
          <div className="w-full bg-green-300 p-5 rounded-md hover:bg-green-400 hover:p-5 transition-all duration-300 group">
            <h2 className="text-2xl font-medium group-hover:text-3xl group-hover:font-semibold transition-all duration-300">
              Total Happy Customers
            </h2>
            <p className="text-3xl font-semibold group-hover:text-4xl group-hover:font-bold transition-all duration-300 group-hover:pt-5">
              {totalUsers > 9
                ? `${totalUsers}`
                : totalUsers?.toString().padStart(2, "0")}{" "}
              People
            </p>
          </div>
          <div className="w-full p-5 hover:p-5 bg-indigo-300 rounded-md hover:bg-indigo-400 transition-all duration-300 group">
            <h2 className="text-2xl font-medium group-hover:font-semibold group-hover:text-3xl transition-all duration-300">
              We Currently Providing More Then
            </h2>
            <p className="text-3xl font-semibold group-hover:text-4xl group-hover:font-bold transition-all duration-300 group-hover:pt-5">
              {totalServices >= 9
                ? `${totalServices}`
                : totalServices?.toString().padStart(2, "0")}{" "}
              Services
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Survey;
