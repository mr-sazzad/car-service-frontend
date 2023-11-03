"use client";

import { useGiveFeedbackMutation } from "@/app/redux/api/feedback/feedbackApi";
import { getUserInfo } from "@/app/utils/auth";
import { message } from "antd";
import Image from "next/image";
import { useForm } from "react-hook-form";

const Feedback = () => {
  const { handleSubmit, register, reset } = useForm();
  const { userId } = getUserInfo() as any;

  const [giveFeedback] = useGiveFeedbackMutation();

  const onSubmit = async (data: any) => {
    if (data.comment === "" || data.suggestion === "") {
      return message.error("Please enter a suggestion and a feedback also");
    }
    const requestedData = {
      comment: data.comment,
      suggestion: data.suggestion,
      userId,
    };
    const result = await giveFeedback(requestedData);

    if (result) {
      message.success("Feedback added!");
      reset();
    }
  };

  return (
    <div className="container mx-auto bg-[#F8F8FF] pt-10">
      <div className="mx-4 md:mx-8 lg:mx-10">
        <div className="flex flex-col justify-center items-center">
          <h2 className="text-3xl font-semibold">Give Your Feedback</h2>
          <p className="font-medium">Thats Makes Us Happy</p>
        </div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex justify-center items-center flex-1">
            <Image
              src="/assets/feedback.gif"
              alt="feedback-gif"
              height={800}
              width={600}
            />
          </div>
          <div className="flex-1 p-5">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label className="mb-1 ml-2">Feedback</label>
                <textarea
                  rows={5}
                  className="outline-none border border-gray-300 w-full p-2 rounded-md"
                  {...register("comment")}
                />
              </div>
              <div>
                <label className="mb-1 ml-2">Suggestion</label>
                <textarea
                  rows={5}
                  className="outline-none border border-gray-300 w-full p-2 rounded-md"
                  {...register("suggestion")}
                />
              </div>
              <button className="py-2 w-full bg-orange-500 hover:bg-orange-400 transition rounded-md text-white font-medium text-base mt-3">
                Post Your Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feedback;
