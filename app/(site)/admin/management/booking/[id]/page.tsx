"use client";

import { getStatusStyle } from "@/app/constants/breakpoints";
import Loading from "@/app/loading";
import {
  useGetSingleByCartIdQuery,
  useUpdateSingleCartMutation,
} from "@/app/redux/api/cart/cartApi";
import { useGetSingleServiceQuery } from "@/app/redux/api/services/serviceApi";
import { useGetSingleUserQuery } from "@/app/redux/api/userApi";
import { hideEmail } from "@/app/utils/emailHide";
import { Button, DatePicker, DatePickerProps, Modal, message } from "antd";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { ImCoinDollar } from "react-icons/im";

const ViewBooking = () => {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [confirmedTime, setConfirmedTime] = useState(
    new Date().toLocaleString()
  );

  // Update Cart
  const [updateSingleCart] = useUpdateSingleCartMutation();

  // Get Cart Data
  const { data: cartService, isLoading: cartLoading } =
    useGetSingleByCartIdQuery(id);

  if (cartLoading) {
    <Loading />;
  }

  // Modal Control
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

      message.success("Request Modified");
    }, 1000);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  // date picker
  const onChange: DatePickerProps["onChange"] = (date, dateString) => {
    setConfirmedTime(dateString);
  };

  const serviceId = cartService?.service;
  const userId = cartService?.userId;

  const { data: service, isLoading: serviceLoading } =
    useGetSingleServiceQuery(serviceId);
  const { data: user, isLoading: userLoading } = useGetSingleUserQuery(userId);

  if (serviceLoading || userLoading) {
    <Loading />;
  }

  // Handle Request Approved
  const handleApproved = async (cartService: any) => {
    const data = {
      ...cartService,
      status: "completed",
    };

    await updateSingleCart({ id: cartService?.id, ...data });
  };

  // handle Reject
  const handleReject = async (cartService: any) => {
    const data = {
      ...cartService,
      status: "cancelled",
    };

    await updateSingleCart({ id: cartService?.id, ...data });
  };

  return (
    <>
      <Modal
        title={service?.title}
        open={isModalOpen}
        onOk={() => handleOk(cartService?.id)}
        onCancel={handleCancel}
      >
        <div className="flex flex-row gap-1 items-center mt-5">
          <p>Status: </p>
          <p
            className={`text-sm font-base ${getStatusStyle(
              cartService?.status
            )}`}
          >
            {cartService?.status}
          </p>
        </div>
        <div className="flex flex-row gap-1 items-center">
          <p className="text-green-500 text-sm font-base">Confirm-Date:</p>
          <p className="text-sm font-base">{cartService?.confirmedDate}</p>
        </div>
        <div className="flex flex-row gap-1 items-center mb-5">
          <p>Price: </p>
          <p className="text-sm font-base flex items-center gap-1">
            {service?.price} <ImCoinDollar />
          </p>
        </div>
        <DatePicker onChange={onChange} className="w-full" />
      </Modal>
      <div className="container mx-auto mt-5">
        <div className="mx-4 md:mx-8 lg:mx-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:justify-between lg:gap-3">
            <div className="flex-1">
              <p className="text-center font-medium text-gray-500 mb-5">
                Service Details
              </p>
              <div>
                <div>
                  <p className="font-medium text-base text-gray-500 flex gap-2 mb-2">
                    Service Name:{" "}
                    <span className="text-black">{service?.title}</span>
                  </p>
                  <p className="font-medium text-base text-gray-500 flex gap-2">
                    Service Charge:{" "}
                    <div className="flex gap-1 items-center">
                      <span className="text-black">{service?.price}</span>
                      <ImCoinDollar className="text-orange-500" />
                    </div>
                  </p>
                </div>
                <div className="mt-5">
                  <p className="flex flex-col gap-2">
                    Description: <span>{service?.description}</span>
                  </p>
                </div>
                <div className="flex">
                  <span
                    className="text-sm mt-5 px-5 py-2 rounded-full bg-orange-400 font-medium text-white hover:bg-orange-600/50 transition tooltip tooltip-[gray-300]"
                    data-tip="service id"
                  >
                    {service?.id}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex-1">
              <p className="text-center font-medium text-gray-500 mb-5">
                User Details
              </p>
              <div className="">
                <div className="flex flex-col gap-3 mb-10">
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-center mt-5">
                      <div>
                        <Image
                          src={
                            user?.profileImage
                              ? user?.profileImage
                              : "/assets/profileImage.png"
                          }
                          alt="profile-image"
                          height={100}
                          width={100}
                          className="flex justify-center items-center rounded-full p-1 border-2 border-gray-700"
                        />
                      </div>
                    </div>
                    <div className="flex justify-center text-sm">
                      @{user?.name}
                    </div>
                  </div>
                  <div className="ml-5 lg:ml-3 flex flex-col gap-3">
                    <p className="text-lg font-medium text-gray-800">
                      Information
                    </p>
                    <p>{user?.email && hideEmail(user?.email)}</p>
                    <p className="text-sm">Gender: {user?.gender}</p>
                    <p className="text-sm">Blood Group: {user?.bloodGroup}</p>
                    <p className="text-sm">Contact No: {user?.contactNo}</p>
                    <p className="text-sm">
                      Person Role Is/An{" "}
                      <span className="font-semibold">{user?.role}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="text-center font-medium text-md mb-5 text-gray-600">
             <span className="bg-gray-700 px-5 py-2 rounded-full text-white tooltip hover:bg-gray-800 transition" data-tip="service-status">Service Status: {cartService?.status}</span>
          </div>
          <div className="flex justify-center items-center gap-3">
            {cartService?.status !== "completed" ||
              cartService?.status !== "cancelled" && (
              <Button onClick={() => handleApproved(cartService)}>
                Approved
              </Button>
            )}

            {cartService?.status !== "completed" ||
              cartService?.status !== "cancelled" && (
                <Button onClick={showModal}>Adjust</Button>
              )}
            {cartService?.status !== "cancelled" && (
              <Button onClick={() => handleReject(cartService)}>Reject</Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewBooking;
