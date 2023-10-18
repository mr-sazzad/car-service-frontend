"use client";

import { breakpointColumnsObj } from "@/app/constants/breakpoints";
import Loading from "@/app/loading";
import { useGetSingleServiceQuery } from "@/app/redux/api/services/serviceApi";
import PersonCard from "@/components/reviews/ReviewCard";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

import Masonry from "react-masonry-css";

const DetailsPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleServiceQuery(id);

  const [localDate, setLocalDate] = useState("");

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  useEffect(() => {
    if (data?.createdAt) {
      setLocalDate(formatDate(data.createdAt));
    }
  }, [data]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto mt-5">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="flex flex-col lg:flex-row justify-between items-center">
          <div className="flex-1 flex justify-center items-center">
            <Image
              src={data?.image}
              alt="service-image"
              width={300}
              height={400}
              className="hover:scale-125 overflow-hidden transition hover:rounded-md"
            />
          </div>
          <div className="flex-1 flex flex-col">
            <p className="text-center font-medium text-lg text-gray-600">
              Details
            </p>
            <div className="mb-5">
              <p className="text-sm font-medium">Title: {data?.title}</p>
              <p className="text-sm font-medium">Price: {data?.price}</p>
              <p className="text-sm font-medium">Created: {localDate}</p>
            </div>
            <div>
              <p className="font-medium text-base">Description:</p>
              <p className="text-sm text-gray-600">{data?.description}</p>
            </div>
          </div>
        </div>
        <div className="mt-5 border-t border-gray-300">
          <div className="mt-5">
            <p className="font-medium text-lg text-gray-400 mb-5">_Reviews</p>
            <Masonry
              breakpointCols={breakpointColumnsObj}
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {data?.Reviews.map((review: any) => (
                <PersonCard key={review?.id} rev={review} />
              ))}
            </Masonry>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;
