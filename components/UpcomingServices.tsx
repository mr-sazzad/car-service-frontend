"use client";

import Loading from "@/app/loading";
import { useGetAllUpcomingServicesQuery } from "@/app/redux/api/services/serviceApi";
import UpcomingCard from "./service/UpcomingCard";

const UpcomingServices = () => {
  const { data, isLoading } = useGetAllUpcomingServicesQuery(undefined);

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="container mx-auto mt-5">
      <div>
        <div>
          <div className="h-[150px] w-full bg-gray-50 flex justify-center items-center">
            <h1 className="text-center text-4xl font-semibold text-orange-600 my-5 hover:text-5xl transition-all ease-in duration-300">
             # Upcoming Services
            </h1>
          </div>
          <div className="mx-4 md:mx-8 lg:mx-10 mt-10">
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 flex-wrap">
              {data?.map((service: any) => (
                <UpcomingCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpcomingServices;
