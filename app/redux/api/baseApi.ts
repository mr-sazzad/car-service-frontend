import axiosBaseQuery from "@/app/helpers/axios/axiosBaseQuery";
import { createApi } from "@reduxjs/toolkit/query/react";
import { tagTypesList } from "./tagTypes";

export const getBaseUrl = (): string => {
  return "https://car-service-d6fgsfta5-mr-sazzad.vercel.app/api/v1";
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: axiosBaseQuery({ baseUrl: getBaseUrl() }),
  endpoints: (builder) => ({}),
  //  result cashing
  tagTypes: tagTypesList,
});
