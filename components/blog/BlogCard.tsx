import { IBlog } from "@/app/types";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ data }: { data: IBlog }) => {
  return (
    <Link
      href={`/user/blogs/${data.id}`}
      className="flex flex-col gap-2 w-full border border-gray-400 p-3 rounded-md"
    >
      <div className="relative w-full h-[160px]">
        <Image src={data.image} alt="blog-image" fill objectFit="cover" />
      </div>
      <div className="text-2xl font-bold text-gray-500 text-center mb-5">
        {data.title}
      </div>
      <div className="text-sm mb-5">
        {data.content && data.content.length > 100
          ? `${data.content.substring(0, 100)}...`
          : data.content}
      </div>
      <div className="border-t border-gray-200">
        <div className="flex justify-between items-center gap-3 mt-3">
          <div className="">
            <p className="text-xs">Uploaded by</p>
            <p className="text-sm font-medium">Admin Panel</p>
          </div>
          <div>
            <p className="text-xs">published on</p>
            <p className="text-sm font-medium">
              {new Date(data.createdAt).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
