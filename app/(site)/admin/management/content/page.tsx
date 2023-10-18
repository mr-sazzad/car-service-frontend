"use client";

import Loading from "@/app/loading";
import { useGetAllBlogsQuery } from "@/app/redux/api/blogs/blogApi";
import MyTable from "@/components/Table";
import { Button } from "antd";
import Link from "next/link";
import { BiTrashAlt } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";

const ContentManagement = () => {
  const { data: blogs, isLoading } = useGetAllBlogsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  const columns = [
    {
      title: "Blog Id",
      dataIndex: "id",
      sorter: true,
    },
    {
      title: "TItle",
      dataIndex: "title",
    },
    {
      title: "Action",
      dataIndex: "id",
      render: function (data: any) {
        return (
          <>
            <Link href={`/admin/management/content/${data}`}>
              <Button className="border border-orange-500 hover:border-orange-600">
                <MdRemoveRedEye className="text-orange-500" />
              </Button>
            </Link>
              <Button type="primary" danger className="ml-3">
                <BiTrashAlt/>
              </Button>
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
            Want To Add New Blog?{" "}
          </p>
          <Link href="/admin/management/new-blog">
            <Button>Add New Blog</Button>
          </Link>
        </div>
        <MyTable loading={isLoading} columns={columns} dataSource={blogs} />
      </div>
    </div>
  );
};

export default ContentManagement;
