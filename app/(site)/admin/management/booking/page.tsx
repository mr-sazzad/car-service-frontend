"use client";

import Loading from "@/app/loading";
import { useGetAllPendingCartQuery } from "@/app/redux/api/cart/cartApi";
import MyTable from "@/components/Table";
import Link from "next/link";
import { MdRemoveRedEye } from "react-icons/md";

const BookingManagement = () => {
  const { data: services, isLoading } = useGetAllPendingCartQuery(undefined);

  if (isLoading) {
    <Loading />;
  }

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
              <button className="border border-orange-500 hover:bg-orange-600 hover:border-orange-600 transition-all duration-300 rounded px-4 py-2 group">
                <MdRemoveRedEye className="text-orange-500 group-hover:text-white transition duration-300" />
              </button>
            </Link>
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
