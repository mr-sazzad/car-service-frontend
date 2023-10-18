"use client";

import Loading from "@/app/loading";
import { useGetAllFromCartQuery } from "@/app/redux/api/cart/cartApi";
import { useGetAllAvailableServicesQuery } from "@/app/redux/api/services/serviceApi";
import MyTable from "@/components/Table";
import { Button } from "antd";
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
      const updatedCartProducts = cartData.map((item: any) => {
        const service = services.find(
          (product: any) => product.id === item.service
        );
        return { ...service, status: item.status };
      });
      setCartProducts(updatedCartProducts);
    }
  }, [isCartLoading, isServicesLoading, cartData, services]);

  if (isCartLoading || isServicesLoading || cartProducts.length === 0) {
    return <Loading />;
  }

  const columns = [
    {
      title: "Id",
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
              <Button className="border border-orange-500 hover:border-orange-600">
                <MdRemoveRedEye className="text-orange-500" />
              </Button>
            </Link>
          </>
        );
      },
    },
  ];

  return (
    <div className="mt-5 container mx-auto">
      <div className="mx-4 md:mx-8 lg:mx-10">
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
