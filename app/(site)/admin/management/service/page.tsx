"use client";

import Loading from "@/app/loading";
import { useGetAllServicesQuery } from "@/app/redux/api/services/serviceApi";
import MyTable from "@/components/Table";
import Link from "next/link";
import { MdRemoveRedEye } from "react-icons/md";
import { PiTrash } from "react-icons/pi";

const ServiceManagement = () => {
  const { data: products, isLoading } = useGetAllServicesQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  const columns = [
    {
      title: "Title",
      dataIndex: "title",
    },
    {
      title: "Price",
      dataIndex: "price",
    },
    {
      title: "Status",
      dataIndex: "status",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/management/service/${data}`}>
              <button className="border border-orange-500 hover:bg-orange-600 hover:border-orange-600 transition-all duration-300 rounded px-3 py-2">
                <MdRemoveRedEye className="text-orange-500 hover:text-white transition duration-300" />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto">
      <div className="mx-4 md:mx-8 lg:mx-10 mt-5">
        <div className="flex justify-between items-center mb-5">
          <p>Want to add service</p>
          <Link href="/admin/management/add-new">
            <button
              className="
                border 
                border-gray-300 
                hover:text-white 
                hover:bg-gray-700 
                transition-all 
                duration-300
                rounded-[4px]
                px-2
                py-1
              "
            >
              Add New Service
            </button>
          </Link>
        </div>
        <MyTable loading={isLoading} columns={columns} dataSource={products} />
      </div>
    </div>
  );
};

export default ServiceManagement;
