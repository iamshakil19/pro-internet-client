import { IMeta } from "@/types";
import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";


const BOOKING_URL = "/booking";

export const bookingApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (data) => ({
                url: BOOKING_URL,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.booking],
        }),

        getAllBooking: builder.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: BOOKING_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: any, meta: IMeta) => {
                return {
                    booking: response,
                    meta,
                };
            },
            providesTags: [tagTypes.package],
        }),

        getSingleBooking: builder.query({
            query: (id: string | string[] | undefined) => ({
                url: `${BOOKING_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.booking],
        }),

        updateBooking: builder.mutation({
            query: (data) => ({
                url: `${BOOKING_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.package],
        }),

        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `${BOOKING_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.booking],
        }),
    })
})

export const { useCreateBookingMutation, useDeleteBookingMutation, useGetAllBookingQuery, useGetSingleBookingQuery, useUpdateBookingMutation } = bookingApi