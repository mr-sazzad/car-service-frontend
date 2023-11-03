"use client";

import Loading from "@/app/loading";
import {
  useDeleteSingleBlogMutation,
  useGetAllBlogsQuery,
} from "@/app/redux/api/blogs/blogApi";
import MyTable from "@/components/Table";
import { Button, message } from "antd";
import Link from "next/link";
import { BiTrashAlt } from "react-icons/bi";
import { MdRemoveRedEye } from "react-icons/md";

const ContentManagement = () => {
  const { data: blogs, isLoading } = useGetAllBlogsQuery(undefined);

  const [deleteSingleBlog] = useDeleteSingleBlogMutation();

  if (isLoading) {
    return <Loading />;
  }

  const handleRemove = async (id: string) => {
    const res = await deleteSingleBlog(id);

    if (res) {
      message.warning("blog deleted");
    }
  };

  const columns = [
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
              <button className="border bg-orange-400  hover:bg-orange-600 px-4 py-[9px] rounded-md transition">
                <MdRemoveRedEye className="text-white" />
              </button>
            </Link>
            <Button
              type="primary"
              danger
              className="ml-3"
              onClick={() => handleRemove(data)}
            >
              <BiTrashAlt />
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
              Add New Blog
            </button>
          </Link>
        </div>
        <MyTable loading={isLoading} columns={columns} dataSource={blogs} />
      </div>
    </div>
  );
};

export default ContentManagement;
