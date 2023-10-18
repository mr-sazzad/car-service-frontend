"use client";

import { useCreateReviewMutation } from "@/app/redux/api/reviews/reviewsApi";
import { getUserInfo } from "@/app/utils/auth";
import { Rate, message } from "antd";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

const ReviewPage = () => {
  const [rating, setRating] = useState(3);
  const [review, setReview] = useState("");

  const router = useRouter();

  const { id } = useParams();
  const { userId } = getUserInfo() as any;

  const [createReview] = useCreateReviewMutation();

  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  const handleReviewChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setReview(event.target.value);
  };

  const handleReview = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userRating = Number(rating);
    if (userRating <= 0) {
     return message.error("Please select At Least One Star rating");
    }
    if (review.length <= 10) {
     return message.error("Please give More than 10 Characters Review");
    }
    const userReview = {
      review,
      rating: userRating,
      serviceId: id as string,
      userId,
    };
    await createReview(userReview);
    message.success("Review Posted successfully")

    setTimeout(() => {
      router.back();
    }, 1000);
  };

  return (
    <div className="container mx-auto bg-[#FBFBFB] pt-10">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <h2 className="text-center text-3xl font-semibold">Give Your Review</h2>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex justify-center items-center flex-1">
            <Image
              src="/assets/review.gif"
              alt="feedback-gif"
              height={800}
              width={600}
            />
          </div>
          <div className="flex-1 p-5">
            <form onSubmit={handleReview}>
              <div className="flex flex-col gap-1">
                <label className="mb-1 ml-2">Rating</label>
                <Rate allowHalf value={rating} onChange={handleRatingChange} />
              </div>
              <div className="mt-5">
                <label className="mb-2 ml-2">Review</label>
                <textarea
                  rows={8}
                  className="outline-none border border-gray-300 w-full p-2 rounded-md"
                  value={review}
                  onChange={handleReviewChange}
                />
              </div>
              <button
                type="submit"
                className="py-2 w-full bg-orange-500 hover:bg-orange-400 transition rounded-md text-white font-medium text-base mt-3"
              >
                Publish Your Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
