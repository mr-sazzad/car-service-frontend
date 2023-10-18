"use client";

import Loading from "@/app/loading";
import { useDeleteSingleServiceMutation, useGetAllServicesQuery } from "@/app/redux/api/services/serviceApi";
import MyTable from "@/components/Table";
import { Button } from "antd";
import Link from "next/link";
import { MdRemoveRedEye } from "react-icons/md";
import { PiTrash } from "react-icons/pi";

const ServiceManagement = () => {
  const { data: products, isLoading } = useGetAllServicesQuery(undefined);
  const [deleteSingleService] = useDeleteSingleServiceMutation();

  if (isLoading) {
   return <Loading />;
  }

  const handleServiceDelete = async(id: string) => {
    const res = await deleteSingleService(id);
    if(res) {
      message.success("Service deleted successfully")
    }
    
  };

  const columns = [
    {
      title: "User Id",
      dataIndex: "id",
      sorter: true,
    },
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
              <Button className="border border-orange-500 hover:border-orange-600">
                <MdRemoveRedEye className="text-orange-500" />
              </Button>
            </Link>
            <Button
              className="ml-3"
              type="primary"
              danger
              onClick={() => handleServiceDelete(data)}
            >
              <PiTrash />
            </Button>
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
            <Button>Add New Service</Button>
          </Link>
        </div>
        <MyTable loading={isLoading} columns={columns} dataSource={products} />
      </div>
    </div>
  );
};

export default ServiceManagement;
