"use client";

import { getStatusStyle } from "@/app/constants/breakpoints";
import Loading from "@/app/loading";
import {
  useGetSingleFromCartQuery,
  useUpdateSingleCartMutation,
} from "@/app/redux/api/cart/cartApi";
import { useGetSingleServiceQuery } from "@/app/redux/api/services/serviceApi";
import { Button, DatePicker, DatePickerProps, Modal, message } from "antd";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

import { GiShatteredHeart } from "react-icons/gi";
import { ImCoinDollar } from "react-icons/im";

const ViewPage = () => {
  const [updateSingleCart] = useUpdateSingleCartMutation();

  const { id } = useParams();
  const [confirmedTime, setConfirmedTime] = useState(
    new Date().toLocaleString()
  );

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = async (id: string) => {
    const data = {
      confirmedDate: confirmedTime,
      status: "pending",
    };

    await updateSingleCart({ id, ...data });

    setTimeout(() => {
      setIsModalOpen(false);

      message.success("Your Request Has been sent");
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // date picker
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setConfirmedTime(dateString);
  };

  const { data: cart, isLoading: cartLoading } = useGetSingleFromCartQuery(id);

  const { data: service, isLoading: serviceLoading } = useGetSingleServiceQuery(
    cart?.service
  );

  if (cartLoading || serviceLoading) {
    return <Loading />;
  }

  const handleServiceCancel = async (id: string) => {
    const data = {
      id,
      confirmedDate: null,
      status: "cancelled",
    };

    await updateSingleCart(data);
  };

  return (
    <>
      <Modal
        title={service?.title}
        open={isModalOpen}
        onOk={() => handleOk(cart?.id)}
        onCancel={handleCancel}
      >
        <div className="flex flex-row gap-1 items-center mt-5">
          <p>Status: </p>
          <p className={`text-sm font-base ${getStatusStyle(cart?.status)}`}>
            {cart?.status}
          </p>
        </div>
        {cart?.confirmedDate === null ? (
          <div className="flex flex-row gap-1 items-center">
            <p className="text-red-500 text-sm font-base">Confirm-Date:</p>
            <p className="text-sm font-base">Available After Booking</p>
          </div>
        ) : (
          <div className="flex flex-row gap-1 items-center">
            <p className="text-green-500 text-sm font-base">Confirm-Date:</p>
            <p className="text-sm font-base">{cart?.confirmedDate}</p>
          </div>
        )}
        <div className="flex flex-row gap-1 items-center mb-5">
          <p>Price: </p>
          <p className="text-sm font-base flex items-center gap-1">
            {service?.price} <ImCoinDollar />
          </p>
        </div>
        <DatePicker onChange={onChange} className="w-full" />
      </Modal>

      <div className="container mx-auto my-5">
        <div className="mx-4 md:mx-8 lg:mx-10">
          <div className="text-center font-medium text-base mb-5">
            {service?.title}
          </div>
          <div className="flex flex-col gap-10 lg:gap-0 lg:flex-row justify-between">
            <div className="flex-1">
              <p className="text-center">Product Details</p>
              <div className="flex flex-row gap-1 items-center">
                <p>Price: </p>
                <p className="text-sm font-base flex items-center gap-1">
                  {service?.price} <ImCoinDollar />
                </p>
              </div>
              <div className="flex flex-row gap-1 items-center">
                <p>Status: </p>
                <p
                  className={`text-sm font-base ${getStatusStyle(
                    cart?.status
                  )}`}
                >
                  {cart?.status}
                </p>
              </div>

              {cart?.confirmedDate === null ? (
                <div className="flex flex-row gap-1 items-center">
                  <p className="text-red-500 text-sm font-base">
                    Confirm-Date:
                  </p>
                  <p className="text-sm font-base">Available After Booking</p>
                </div>
              ) : (
                <div className="flex flex-row gap-1 items-center">
                  <p className="text-green-500 text-sm font-base">
                    Confirm-Date:
                  </p>
                  <p className="text-sm font-base">{cart?.confirmedDate}</p>
                </div>
              )}
              <div className="flex flex-col gap-1">
                <p className="mt-5">Description: </p>
                <p className="text-sm font-base">{service?.description}</p>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-center">Actions</p>

              <div className="flex justify-center items-center">
                <div className="mt-5 flex flex-row gap-3">
                  {cart?.status !== "cancelled" && (
                    <Button onClick={showModal}>Book</Button>
                  )}
                  {cart?.status !== "cancelled" && (
                    <Button
                      onClick={() => handleServiceCancel(cart?.id)}
                      danger
                    >
                      Cancel
                    </Button>
                  )}
                  {cart?.status !== "completed" && (
                    <Button>
                      <Link href={`/review/${id}`}>Review</Link>
                    </Button>
                  )}
                  <div className="flex flex-col gap-3">
                    {cart?.status === "cancelled" && (
                      <div className="text-sm font-medium px-3 py-4 text-gray-700 rounded-md border border-gray-400">
                        <p className="text-md font-semibold text-gray-500 mb-3 flex flex-row gap-2 items-center">
                          <GiShatteredHeart className="text-rose-600" />{" "}
                          Attention
                        </p>
                        <p className="">
                          You have to change service status for showing booking
                          options
                        </p>
                        <p className="">
                          If you want to do that you have to add this product
                          another time
                        </p>
                        <p className="">
                          Because the service status is currently{" "}
                          <span className="text-rose-500 font-semibold">
                            &quot;cancelled&quot;{" "}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewPage;
