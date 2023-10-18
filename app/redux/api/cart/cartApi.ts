import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const cartApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    addToCart: build.mutation({
      query: (data) => ({
        url: "/cart/addToCart",
        method: "POST",
        data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),

    getAllFromCart: build.query({
      query: () => ({
        url: "/cart",
        method: "GET",
      }),
      providesTags: [tagTypes.cart],
    }),

    getAllPendingCart: build.query({
      query: () => ({
        url: "/cart/pending",
        method: "GET",
      }),
      providesTags: [tagTypes.cart],
    }),

    getSingleFromCart: build.query({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.cart],
    }),

    getSingleByCartId: build.query({
      query: (id) => ({
        url: `/cart/cart-id/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.cart],
    }),

    updateSingleCart: build.mutation({
      query: ({ id, ...data }) => ({
        url: `/cart/${id}`,
        method: "PATCH",
        data,
      }),
      invalidatesTags: [tagTypes.cart],
    }),
  }),
});

export const {
  useAddToCartMutation,
  useGetAllFromCartQuery,
  useGetSingleFromCartQuery,
  useUpdateSingleCartMutation,
  useGetAllPendingCartQuery,
  useGetSingleByCartIdQuery,
} = cartApi;
