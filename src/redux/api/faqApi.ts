'use client'

import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const FAQ_URL = "/faq";

export const faqApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createFaq: builder.mutation({
            query: (data) => ({
                url: FAQ_URL,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.faq],
        }),
        getAllFaq: builder.query({
            query: () => {
                return {
                    url: FAQ_URL,
                    method: "GET",
                };
            },
            transformResponse: (response: any, meta: IMeta) => {
                return {
                    faq: response,
                    meta,
                };
            },
            providesTags: [tagTypes.faq],
        }),
    })
})

export const { useCreateFaqMutation, useGetAllFaqQuery } = faqApi