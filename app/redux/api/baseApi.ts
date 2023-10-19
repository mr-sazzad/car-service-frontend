import axiosBaseQuery from "@/app/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tagTypes";

export const getBaseUrl = (): string => {
  return (
    process.env.PUBLIC_API_BASE_URL ||
    "https://car-service-backend-liart.vercel.app/api/v1"
  );
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: (builder) => ({}),
  //  result cashing
  tagTypes: tagTypesList,
});
