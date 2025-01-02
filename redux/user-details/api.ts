import {
  CreateUserDetailSchema,
  DeleteSchema,
  UpdateUserDetailSchema,
} from "@/schema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userDetailsApi = createApi({
  reducerPath: "userDetailsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getUserDetails: builder.query<any, string>({
      query: (userId) => `user-details?userId=${userId}`,
    }),
    createUserDetail: builder.mutation<any, CreateUserDetailSchema>({
      query: (body) => ({
        url: `user-details`,
        method: "POST",
        body,
      }),
    }),
    updateUserDetail: builder.mutation<any, UpdateUserDetailSchema>({
      query: (body) => ({
        url: `user-details`,
        method: "PATCH",
        body,
      }),
    }),
    deleteUserDetail: builder.mutation<any, DeleteSchema>({
      query: (body) => ({
        url: `user-details`,
        method: "DELETE",
        body,
      }),
    }),
  }),
});

export const {
  useGetUserDetailsQuery,
  useCreateUserDetailMutation,
  useUpdateUserDetailMutation,
  useDeleteUserDetailMutation,
} = userDetailsApi;
