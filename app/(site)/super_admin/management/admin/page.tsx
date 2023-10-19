"use client";

import Loading from "@/app/loading";
import { useGetAllAdminsQuery } from "@/app/redux/api/userApi";
import MyTable from "@/components/Table";
import { Button } from "antd";
import Link from "next/link";
import { MdRemoveRedEye } from "react-icons/md";

const Dashboard = () => {
  const { data: admins, isLoading } = useGetAllAdminsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  console.log(admins, "admins");

  const columns = [
    {
      title: "User Id",
      dataIndex: "id",
      sorter: true,
    },
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
            <Link href={`/super_admin/management/admin/${data}`}>
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
            Is Necessary To Add New Admin?
          </p>
          <Link href="/super_admin/management/new-admin">
            <Button>Add New Admin</Button>
          </Link>
        </div>
        <MyTable loading={isLoading} columns={columns} dataSource={admins} />
      </div>
    </div>
  );
};

export default Dashboard;
