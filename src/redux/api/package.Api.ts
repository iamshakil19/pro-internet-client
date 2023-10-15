import { IMeta } from "@/types";
import { baseApi } from "./baseApi";
import { tagTypes } from "../tag-types";

const PACKAGE_URL = "/package";

export const packageApi = baseApi.injectEndpoints({
    
    endpoints: (builder) => ({

        createPackage: builder.mutation({
            query: (data) => ({
                url: PACKAGE_URL,
                method: "POST",
                data,
            }),
            invalidatesTags: [tagTypes.package],
        }),

        getAllPackage: builder.query({
            query: (arg: Record<string, any>) => {
                return {
                    url: PACKAGE_URL,
                    method: "GET",
                    params: arg,
                };
            },
            transformResponse: (response: any, meta: IMeta) => {
                return {
                    package: response,
                    meta,
                };
            },
            providesTags: [tagTypes.package],
        }),

        getSinglePackage: builder.query({
            query: (id: string | string[] | undefined) => ({
                url: `${PACKAGE_URL}/${id}`,
                method: "GET",
            }),
            providesTags: [tagTypes.package],
        }),

        updatePackage: builder.mutation({
            query: (data) => ({
                url: `${PACKAGE_URL}/${data.id}`,
                method: "PATCH",
                data: data.body,
            }),
            invalidatesTags: [tagTypes.package],
        }),

        deletePackage: builder.mutation({
            query: (id) => ({
                url: `${PACKAGE_URL}/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: [tagTypes.package],
        }),
    })
})

export const { useGetAllPackageQuery, useCreatePackageMutation, useDeletePackageMutation, useGetSinglePackageQuery, useUpdatePackageMutation } = packageApi