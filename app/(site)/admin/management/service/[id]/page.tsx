"use client";

import Loading from "@/app/loading";
import {
  useDeleteSingleServiceMutation,
  useGetSingleServiceQuery,
  useUpdateSingleServiceMutation,
} from "@/app/redux/api/services/serviceApi";
import { message } from "antd";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  PiCurrencyDollarSimpleBold,
  PiWarningOctagonLight,
} from "react-icons/pi";

const ServiceManagement = () => {
  const { id } = useParams();
  const { data: service, isLoading } = useGetSingleServiceQuery(id);
  const [updateSingleService] = useUpdateSingleServiceMutation();
  const [deleteSingleService] = useDeleteSingleServiceMutation();

  const router = useRouter();

  const { register, handleSubmit } = useForm();

  if (isLoading) {
    return <Loading />;
  }

  const onSubmit = async (data: any) => {
    try {
      const res = await updateSingleService({ id, data });

      if (res) {
        setTimeout(() => {
          message.success("Service Updated");
          router.push("/admin/management/service");
        });
      }
    } catch (err: any) {
      message.error("something went wrong");
    }
  };

  const handleDelete = async (id: string) => {
    const result = await deleteSingleService(id);

    if (result) {
      message.success("Service Removed");
    }
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
                  <PiCurrencyDollarSimpleBold className="text-orange-500" />
                </div>
              </p>
            </div>
            <div className="mt-5">
              <p className="flex flex-col gap-2">
                Description: <span>{service?.description}</span>
              </p>
            </div>
            <div className="flex flex-col gap-2">
              <p className="mb-2 text-2xl font-semibold">Danger Zone</p>
              <div className="p-5 bg-gray-300 rounded-md">
                <div className="p-3 bg-[#1F1315] border border-[#591A1A]">
                  <div>
                    <p className="text-sm mb-4 flex gap-2">
                      <PiWarningOctagonLight className="text-[#591A1A] text-lg" />{" "}
                      If you wish to proceed with the deletion of this service,
                      please feel free to do so now. Your prompt action will
                      ensure the seamless removal of the service from the system
                    </p>
                    <button
                      onClick={() => handleDelete(service?.id)}
                      className="px-3 py-1 border-[#591A1A] bg-transparent rounded-md hover:bg-[#E5484D] transition text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
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
                    className="border border-gray-300 outline-none h-[3rem] pl-2 rounded-md"
                  />
                </div>
                <div className="flex flex-col gap-1 mb-4 w-full">
                  <label htmlFor="price ml-2">Price:</label>
                  <input
                    defaultValue={service?.price}
                    {...register("price")}
                    type="text"
                    id="price"
                    className="border border-gray-300 outline-none h-[3rem] pl-2 rounded-md"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1 mb-4 w-full">
                <label htmlFor="price ml-2">Status:</label>
                <select
                  className="select select-bordered w-full"
                  defaultValue={service?.status || "Select Service status?"}
                  {...register("status")}
                >
                  <option disabled>Select Service status?</option>
                  <option>current</option>
                  <option>up_coming</option>
                </select>
              </div>
              <div className="flex flex-col gap-1 mb-4">
                <label htmlFor="description ml-2">Description:</label>
                <textarea
                  defaultValue={service?.description}
                  rows={7}
                  {...register("description")}
                  id="description"
                  className="border border-gray-300 outline-none pl-2 rounded-md"
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
