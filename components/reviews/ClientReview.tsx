"use client";

import { breakpointColumnsObj } from "@/app/constants/breakpoints";
import Loading from "@/app/loading";
import { useGetAllReviewsQuery } from "@/app/redux/api/reviews/reviewsApi";
import Masonry from "react-masonry-css";
import ReviewCard from "./ReviewCard";

const ClientReview = () => {
  const { data: reviews, isLoading } = useGetAllReviewsQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto">
      <div className="mx-4 md:mx-8 lg:mx-10 mb-10 flex flex-col gap-3">
        <div className="h-[150px] w-full bg-gray-50 flex justify-center items-center">
          <h1 className="text-center text-4xl font-semibold text-orange-600 my-5 hover:text-5xl transition-all ease-in duration-300">
            # Client Reviews
          </h1>
        </div>
        <div className="flex justify-center">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {reviews?.map((review: any) => (
              <ReviewCard key={review.id} rev={review} />
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default ClientReview;
