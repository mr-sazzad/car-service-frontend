import { KEY } from "@/app/constants/role";
import { IResponse } from "@/app/types";
import { getFromLocalStorage } from "@/app/utils/localStorage";
import axios from "axios";

export const instance = axios.create();

instance.defaults.headers.post["Content-Type"] = "application/json";
instance.defaults.headers["accept"] = "application/json";
instance.defaults.timeout = 50000;

// Add a request interceptor
instance.interceptors.request.use(
  function (config) {
    // set accessToken to headers before request is sent
    const accessToken = getFromLocalStorage(KEY);

    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor

instance.interceptors.response.use(
  //@ts-ignore
  function (response) {
    // Do something with response data
    const responseObject: IResponse = {
      data: response?.data?.data,
      meta: response?.data?.meta,
    };
    return responseObject;
  },
  function (error) {
    // const responseObject: IErrorResponse = {
    //   statusCode: error?.response?.data?.statusCode || 500,
    //   message: error?.response?.data?.message || "something went wrong",
    //   errorMessages: error?.response?.data?.message,
    // };
    // Do something with response error

    return error.response;
    // return Promise.reject(error);
  }
);
