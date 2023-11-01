"use client";

import { message } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Logo from "../../components/Logo";
import { useUserSignUpMutation } from "../redux/api/userApi";

const SingUp = () => {
  const [userSignUp] = useUserSignUpMutation();
  const router = useRouter();

  const { handleSubmit, register } = useForm();
  const onSubmit = async (data: any) => {
    await userSignUp(data);

    message.success("Sign Up Success");
    setTimeout(() => {
      router.push("/login");
    }, 1000);
  };

  return (
    <div className="container h-[100vh] w-full flex flex-col justify-center items-center mb-10 sign-up-bg">
      <div className="bg-white rounded-md w-full sm:w-[400px]">
        <div className="flex justify-center pt-5">
          <Logo />
        </div>
        <h1 className="mb-5 text-2xl font-semibold text-center">
          Register Your Account
        </h1>
        <div className="px-10 py-10 shadow-md">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex flex-col">
              <label className="text-sm">Name</label>
              <input
                type="text"
                {...register("name", { required: true })}
                className="w-full border border-gray-300 outline-none py-1 px-2 rounded-md mb-4"
              />
            </div>
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
              Sign Up
            </button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <p>already have an account</p>
            <Link
              href="/login"
              className="text-orange-500 inset-1 border-b border-orange-500 hover:text-orange-600 hover:border-orange-600 transition"
            >
              please login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingUp;
