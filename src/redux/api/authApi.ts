import { tagTypes } from "../tag-types";
import { baseApi } from "./baseApi";

const AUTH_URL = "/auth";

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    login: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/login`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    signup: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/signup`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    getMe: build.query({
      query: () => ({
        url: `${AUTH_URL}/get-me`,
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),
    updateProfile: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/${data.id}`,
        method: "PATCH",
        data: data.body,
      }),
      invalidatesTags: [tagTypes.user],
    }),
    changePassword: build.mutation({
      query: (data) => ({
        url: `${AUTH_URL}/change-password`,
        method: "POST",
        data: data,
      }),
      invalidatesTags: [tagTypes.user],
    }),
  }),
});

export const { useLoginMutation, useSignupMutation, useGetMeQuery, useUpdateProfileMutation, useChangePasswordMutation } = authApi;
