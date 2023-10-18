import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";


const BLOG_URL = "/blog";

export const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createBlog: builder.mutation({
            query: (data) => ({
                url: BLOG_URL,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.blog],
        }),
        getAllBlog: builder.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: BLOG_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: any, meta: IMeta) => {
                return {
                    blog: response,
                    meta,
                };
            },
            providesTags: [tagTypes.blog],
        }),
        getSingleBlog: builder.query({
            query: (id: string | string[] | undefined) => ({
                url: `${BLOG_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.blog],
        }),

        updateBlog: builder.mutation({
            query: (data) => ({
                url: `${BLOG_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.blog],
        }),

        deleteBlog: builder.mutation({
            query: (id) => ({
                url: `${BLOG_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.blog],
        }),
    })
})

export const { useCreateBlogMutation, useDeleteBlogMutation, useGetAllBlogQuery, useGetSingleBlogQuery, useUpdateBlogMutation } = blogApi
