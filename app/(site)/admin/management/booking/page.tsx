"use client";

import Loading from "@/app/loading";
import {
  useGetAllPendingCartQuery,
  useUpdateSingleCartMutation,
} from "@/app/redux/api/cart/cartApi";
import MyTable from "@/components/Table";
import { Button, message } from "antd";
import Link from "next/link";
import { MdOutlineCancel, MdRemoveRedEye } from "react-icons/md";

const BookingManagement = () => {
  const { data: services, isLoading } = useGetAllPendingCartQuery(undefined);

  // Update Cart
  const [updateSingleCart] = useUpdateSingleCartMutation();

  if (isLoading) {
    <Loading />;
  }

  // handle Reject
  const HandleReject = async (id: any) => {
    const data = {
      status: "cancelled",
    };

    const res = await updateSingleCart({ id, ...data });

    res && message.success("status updated successfully");
  };

  const columns = [
    {
      title: "Cart Id",
      dataIndex: "id",
      sorter: true,
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
            <Link href={`/admin/management/booking/${data}`}>
              <Button className="border border-orange-500 hover:border-orange-600">
                <MdRemoveRedEye className="text-orange-500" />
              </Button>
            </Link>
            <Button
              className="ml-3"
              type="primary"
              danger
              onClick={() => HandleReject(data)}
            ></Button>
          </>
        );
      },
    },
  ];

  return (
    <div className="container mx-auto mt-5">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <MyTable loading={isLoading} columns={columns} dataSource={services} />
      </div>
    </div>
  );
};

export default BookingManagement;
