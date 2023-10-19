import { baseApi } from "./baseApi";
import { tagTypes } from "./tagTypes";

const userApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    userSignUp: build.mutation({
      query: (data) => ({
        url: `/users/sign-up`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    userLogin: build.mutation({
      query: (data) => ({
        url: `/users/login`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    updateUser: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/users/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.user],
    }),

    getSingleUser: build.query({
      query: (id) => ({
        url: `/users/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    getAllUser: build.query({
      query: () => ({
        url: `/users/`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    getAllAdmins: build.query({
      query: () => ({
        url: `/users/admins`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
  }),
});

export const {
  useUserSignUpMutation,
  useUserLoginMutation,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useGetAllUserQuery,
  useGetAllAdminsQuery
} = userApi;
