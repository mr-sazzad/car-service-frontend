import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const serviceApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    createNewService: build.mutation({
      query: (data) => ({
        url: "/services/create",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.services],
    }),

    getAllAvailableServices: build.query({
      query: () => ({
        url: "/services",
        method: "GET",
      }),
      providesTags: [tagTypes.services],
    }),

    getAllServices: build.query({
      query: () => ({
        url: "/services/all",
        method: "GET",
      }),
      providesTags: [tagTypes.services],
    }),

    getAllUpcomingServices: build.query({
      query: () => ({
        url: "/services/up-coming",
        method: "GET",
      }),
      providesTags: [tagTypes.services],
    }),

    getSingleService: build.query({
      query: (id) => ({
        url: `/services/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.services],
    }),

    updateSingleService: build.mutation({
      query: ({ id, data }) => ({
        url: `/services/${id}`,
        method: "PATCH",
        data: data,
      }),
      invalidatesTags: [tagTypes.services],
    }),

    deleteSingleService: build.mutation({
      query: (id) => ({
        url: `/services/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.services],
    }),
  }),
});

export const {
  useGetAllAvailableServicesQuery,
  useGetAllServicesQuery,
  useGetAllUpcomingServicesQuery,
  useGetSingleServiceQuery,
  useUpdateSingleServiceMutation,
  useCreateNewServiceMutation,
  useDeleteSingleServiceMutation,
} = serviceApi;
