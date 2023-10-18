"use client";

import Loading from "@/app/loading";
import { useGetAllServicesQuery } from "../app/redux/api/services/serviceApi";
import ServiceCard from "./service/ServiceCard";

const AvailableServices = () => {
  const { data, isLoading } = useGetAllServicesQuery(undefined);

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="container mx-auto my-5">
      <div>
        <div>
          <div className="h-[150px] w-full bg-gray-50 flex justify-center items-center">
            <h1 className="text-center text-4xl font-semibold text-orange-600 my-5 hover:text-5xl transition-all ease-in duration-300">
              # Available Services
            </h1>
          </div>
          <div className="mx-4 md:mx-8 lg:mx-10 mt-10">
            <div className="flex flex-col md:flex-row justify-center items-center gap-5 flex-wrap">
              {data?.map((service: any) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AvailableServices;
