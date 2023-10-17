import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";


const FEEDBACK_URL = "/feedback";

export const feedbackApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createFeedback: builder.mutation({
            query: (data) => ({
                url: FEEDBACK_URL,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.feedback],
        }),
        getAllFeedback: builder.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: FEEDBACK_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: any, meta: IMeta) => {
                return {
                    feedback: response,
                    meta,
                };
            },
            providesTags: [tagTypes.feedback],
        }),
    })
})

export const { useCreateFeedbackMutation, useGetAllFeedbackQuery } = feedbackApi