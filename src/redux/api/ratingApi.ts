import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";


const RATING_URL = "/rating";

export const ratingApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({

        createRating: builder.mutation({
            query: (data) => ({
                url: RATING_URL,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.rating],
        }),

        getAllPackage: builder.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: RATING_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: any, meta: IMeta) => {
                return {
                    rating: response,
                    meta,
                };
            },
            providesTags: [tagTypes.rating],
        }),
    })
})

export const { useCreateRatingMutation, useGetAllPackageQuery } = ratingApi