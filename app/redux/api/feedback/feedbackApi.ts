import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const feedbackApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        giveFeedback: build.mutation({
            query: (data) => ({
              url: "/feedbacks/create",
              method: "POST",
              data,
            }),
            invalidatesTags: [tagTypes.feedback],
        }),
        getAllFeedbacks: build.query({
            query: () => ({
                url: "/feedbacks",
                method: "GET",
            }),
            providesTags: [tagTypes.feedback],
        }),
    })
})


export const {useGiveFeedbackMutation, useGetAllFeedbacksQuery} = feedbackApi;