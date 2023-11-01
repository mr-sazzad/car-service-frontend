"use client";

import Loading from "@/app/loading";
import { useGetAllFromCartQuery } from "@/app/redux/api/cart/cartApi";
import { useGetAllAvailableServicesQuery } from "@/app/redux/api/services/serviceApi";
import MyTable from "@/components/Table";
import Link from "next/link";
import { useEffect, useState } from "react";
import { MdRemoveRedEye } from "react-icons/md";

const Dashboard = () => {
  const { data: cartData, isLoading: isCartLoading } =
    useGetAllFromCartQuery(undefined);
  const { data: services, isLoading: isServicesLoading } =
    useGetAllAvailableServicesQuery(undefined);

  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    if (!isCartLoading && !isServicesLoading && cartData && services) {
      const updatedCartProducts = cartData?.map((item: any) => {
        const service = services.find(
          (product: any) => product.id === item.service
        );
        return { ...service, status: item.status };
      });
      setCartProducts(updatedCartProducts);
    }
  }, [isCartLoading, isServicesLoading, cartData, services]);

  if (isCartLoading || isServicesLoading) {
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
      sorter: true,
    },
    {
      title: "Status",
      dataIndex: "status",
      sorter: true,
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/user/dashboard/${data}`}>
              <button className="border px-4 py-[9px] transition bg-orange-500 hover:bg-orange-600 rounded-md">
                <MdRemoveRedEye className="text-white" />
              </button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="mt-5 container mx-auto">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="h-[150px] w-full bg-gray-50 flex justify-center items-center">
          <h1 className="text-center text-4xl font-semibold text-orange-600 my-5 hover:text-5xl transition-all ease-in duration-300">
            # Your Orders
          </h1>
        </div>
        <MyTable
          loading={isCartLoading}
          columns={columns}
          dataSource={cartProducts}
        />
      </div>
    </div>
  );
};

export default Dashboard;
