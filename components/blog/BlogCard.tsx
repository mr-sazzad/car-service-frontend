import { IBlog } from "@/app/types";

const BlogCard = ({ data }: { data: IBlog }) => {
  return (
    <div className="flex flex-col gap-2 w-full border border-gray-400 p-5 rounded-md">
      <div className="text-2xl font-bold text-gray-500 text-center mb-5">
        {data.title}
      </div>
      <div className="text-sm mb-5">{data.content}</div>
      <div className="border-t border-gray-200">
        <div className="flex justify-between items-center mt-3">
          <div className="">
            <p className="text-sm">Uploaded by</p>
            <p className="text-md font-medium">Admin Panel</p>
          </div>
          <div>
            <p className="text-sm">published on</p>
            <p className="text-md font-medium">
              {new Date(data.createdAt).toDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
