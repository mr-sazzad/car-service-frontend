"use client";

import Loading from "@/app/loading";
import { useGetAllUserQuery } from "@/app/redux/api/userApi";
import MyTable from "@/components/Table";
import { Button } from "antd";
import Link from "next/link";
import { MdRemoveRedEye } from "react-icons/md";

const Dashboard = () => {
  const { data: users, isLoading } = useGetAllUserQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Role",
      dataIndex: "role",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/management/user/${data}`}>
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
        <div className="mb-5 flex justify-between items-center">
          <p className="text-md text-gray-600 font-medium">
            Want To Add New User?{" "}
          </p>
          <Link href="/admin/management/new-user">
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
              Add New User
            </button>
          </Link>
        </div>
        <MyTable loading={isLoading} columns={columns} dataSource={users} />
      </div>
    </div>
  );
};

export default Dashboard;
