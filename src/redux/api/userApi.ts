import { IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";


const USER_URL = "/user";

export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllUser: builder.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: USER_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: any, meta: IMeta) => {
                return {
                    users: response,
                    meta,
                };
            },
            providesTags: [tagTypes.user],
        }),
        deleteUser: builder.mutation({
            query: (id) => ({
                url: `${USER_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.user],
        }),
    })
})

export const { useGetAllUserQuery, useDeleteUserMutation } = userApi