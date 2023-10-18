"use client";

import Loading from "@/app/loading";
import { useGetSingleServiceQuery } from "@/app/redux/api/services/serviceApi";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";

import { ImCoinDollar } from "react-icons/im";

const ServiceManagement = () => {
  const { id } = useParams();
  const { data: service, isLoading } = useGetSingleServiceQuery(id);

  const { register, handleSubmit } = useForm();

  if (isLoading) {
    <Loading />;
  }

  console.log(service);

  const onSubmit = (data: any) => {
    console.log(data);
  };

  return (
    <div className="container mx-auto mt-5">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="flex flex-col lg:flex-row gap-3 justify-between items-center p-5">
          <div className="flex-1 flex-col gap-2">
            <p className="text-center font-medium mb-5 text-gray-500">
              Service Details
            </p>
            <div>
              <p className="font-medium text-base text-gray-500 flex gap-2 mb-2">
                Service Name:{" "}
                <span className="text-black">{service?.title}</span>
              </p>
              <p className="font-medium text-base text-gray-500 flex gap-2">
                Service Charge:{" "}
                <div className="flex gap-1 items-center">
                  <span className="text-black">{service?.price}</span>
                  <ImCoinDollar className="text-orange-500" />
                </div>
              </p>
            </div>
            <div className="mt-5">
              <p className="flex flex-col gap-2">
                Description: <span>{service?.description}</span>
              </p>
            </div>
            <div className="flex">
              <span
                className="text-sm mt-5 px-5 py-2 rounded-full bg-orange-400 font-medium text-white hover:bg-orange-600/50 transition tooltip tooltip-[gray-300]"
                data-tip="service id"
              >
                {service?.id}
              </span>
            </div>
          </div>
          <div className="flex-1 flex-col gap-3 w-full">
            <p className="text-center font-medium text-gray-500 mb-5 mt-5 lg:mt-0">
              Update Service Details
            </p>

            <form onSubmit={handleSubmit(onSubmit)} className="w-full">
              <div className="flex flex-col lg:flex-row gap-3 w-full">
                <div className="flex flex-col gap-1 mb-4 w-full">
                  <label htmlFor="serviceTitle ml-2">Service Title:</label>
                  <input
                    defaultValue={service?.title}
                    {...register("title")}
                    type="text"
                    id="title"
                    className="border border-gray-600 outline-none h-[2rem] pl-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 mb-4 w-full">
                  <label htmlFor="price ml-2">Price:</label>
                  <input
                    defaultValue={service?.price}
                    {...register("price")}
                    type="text"
                    id="price"
                    className="border border-gray-600 outline-none h-[2rem] pl-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="description ml-2">Description:</label>
                <textarea
                  defaultValue={service?.description}
                  rows={7}
                  {...register("description")}
                  id="description"
                  className="border border-gray-600 outline-none pl-2 rounded-md"
                />
              </div>
              <button
                type="submit"
                className="p-2 bg-orange-500 hover:bg-orange-400 transition w-full text-white font-medium rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceManagement;
