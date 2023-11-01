"use client";

import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import { KEY } from "../constants/role";
import { useUserLoginMutation } from "../redux/api/userApi";
import { getUserInfo } from "../utils/auth";
import { setToLocalStorage } from "../utils/localStorage";

const Login = () => {
  const [userLogin] = useUserLoginMutation();

  const [isLoading, setIsLoading] = useState(false);

  const userInfo = getUserInfo() as any;

  const router = useRouter();

  const { handleSubmit, register, reset } = useForm();

  useEffect(() => {
    if (userInfo?.userId) {
      router.push(`/${userInfo.role}/profile`);
    }
  }, [userInfo?.userId, userInfo?.role, router]);

  const onSubmit = async (data: any) => {
    try {
      setIsLoading(true);
      const res: any = await userLogin(data);

      if (res?.data?.success === false) {
        setIsLoading(false);
        message.error("something went wrong");
      } else if (!!res?.data) {
        setIsLoading(false);
        message.success("login success");
        setToLocalStorage(KEY, res.data);
      }

      reset();
    } catch (err) {
      setIsLoading(false);
      message.error("something went wrong");
    }
  };

  if (isLoading) {
    message.loading("Loading...");
  }

  return (
    <div className="container h-[100vh] w-full login-bg flex flex-col justify-center items-center">
      <div className="bg-white rounded-md w-full sm:w-[400px]">
        <div className="flex justify-center pt-4">
          <Logo />
        </div>
        <h1 className="mb-5 text-2xl font-semibold text-center">
          Login Into Your Account
        </h1>
        <div className="px-10 py-10 shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col">
              <label className="text-sm">email</label>
              <input
                type="email"
                {...register("email", { required: true })}
                className="w-full border border-gray-300 outline-none py-1 px-2 rounded-md mb-4"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm">password</label>
              <input
                type="password"
                {...register("password", { required: true })}
                className="w-full border border-gray-300 outline-none py-1 px-2 rounded-md mb-4"
              />
            </div>

            <button
              type="submit"
              className="bg-orange-500 py-1 px-2 rounded-md text-white hover:bg-orange-600 transition"
            >
              Login
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <p>new into car repair</p>
            <Link
              href="/sign-up"
              className="text-orange-500 inset-1 border-b border-orange-500 hover:text-orange-600 hover:border-orange-600 transition"
            >
              please sign-up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
