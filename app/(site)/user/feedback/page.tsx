"use client";

import { breakpointColumnsObj } from "@/app/constants/breakpoints";
import Loading from "@/app/loading";
import { useGetAllFeedbacksQuery } from "@/app/redux/api/feedback/feedbackApi"; // Replace with the correct path to your API
import Image from "next/image";
import Masonry from "react-masonry-css";

const Feedbacks = () => {
  const { data: feedbacks, isLoading } = useGetAllFeedbacksQuery(undefined);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="container mx-auto my-5">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="h-[100px] w-full bg-gray-50 flex justify-center items-center mb-5">
          <h1 className="text-center text-4xl font-semibold text-orange-600 my-5 hover:text-5xl transition-all ease-in duration-300">
            # Users Feedbacks
          </h1>
        </div>
        <div className="flex justify-center">
          <Masonry
            breakpointCols={breakpointColumnsObj}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
          >
            {feedbacks?.map((feedback: any) => (
              <div key={feedback.id} className="bg-gray-50 px-5 py-7">
                <div className="flex flex-col gap-3 text-sm font-medium text-gray-600">
                  <div className="flex flex-row gap-3">
                    <div className="flex flex-row gap-3 justify-between">
                      <div>
                        <Image
                          src={feedback?.user?.profileImage}
                          alt="profile-image"
                          height={40}
                          width={40}
                          className="rounded-full p-1 border-2 border-gray-500"
                        />
                      </div>
                      <div>
                        <p className="text-sm">@ {feedback?.user?.name}</p>
                        <p className="text-xs">
                          {new Date(feedback?.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p className="text-md font-medium">
                      {feedback?.comment && `Comment:`}
                    </p>
                    <p>{feedback?.comment}</p>
                  </div>
                  <div>
                    <p className="text-md font-medium">
                      {feedback?.suggestion && `Suggestion:`}
                    </p>
                    <p>{feedback?.suggestion}</p>
                  </div>
                </div>
              </div>
            ))}
          </Masonry>
        </div>
      </div>
    </div>
  );
};

export default Feedbacks;
