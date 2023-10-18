import { baseApi } from "../baseApi";
import { tagTypes } from "../tagTypes";

const blogApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        createBlog: build.mutation({
            query: (data) => ({
                url: "/blogs/create",
                method: "POST",
                data
            }),
            invalidatesTags: [tagTypes.blog]
        }),

        getAllBlogs: build.query({
            query: () => ({
                url: "/blogs",
                method: "GET"
            }),
            providesTags: [tagTypes.blog]
        }),

        getSingleBlog: build.query({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: "GET"
            }),
            providesTags: [tagTypes.blog]
        }),

        updateSingleBlog: build.mutation({
            query: ({id, data}) => ({
                url: `/blogs/${id}`,
                method: "PATCH",
                data
            }),
            invalidatesTags: [tagTypes.blog]
        }),

        deleteSingleBlog: build.mutation({
            query: (id) => ({
                url: `/blogs/${id}`,
                method: "DELETE"
            }),
            invalidatesTags: [tagTypes.blog]
        })
    })
})

export const {useCreateBlogMutation, useGetAllBlogsQuery, useGetSingleBlogQuery, useUpdateSingleBlogMutation, useDeleteSingleBlogMutation} = blogApi;