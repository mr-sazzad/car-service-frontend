import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const reviewApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createReview: build.mutation({
      query: (data) => ({
        url: `/reviews/create`,
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.review],
    }),

    getAllReviews: build.query({
      query: () => ({
        url: `/reviews`,
        method: "GET",
      }),
      providesTags: [tagTypes.review],
    }),
  }),
});

export const { useCreateReviewMutation, useGetAllReviewsQuery } = reviewApi;
