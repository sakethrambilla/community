import { CreatePostSchema } from "@/schema";
import { AdminPost, errorType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminPostApi = createApi({
  reducerPath: "adminPostApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/admin/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getAdminPosts: builder.query<AdminPost[], void>({
      query: () => `post`,
      providesTags: ["Post"],
    }),
    getAdminPost: builder.query<AdminPost, string>({
      query: (id) => `post/${id}`,
      providesTags: ["Post"],
    }),
    createAdminPost: builder.mutation<AdminPost, CreatePostSchema>({
      query: (body) => ({
        url: `post`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Post"],
    }),
    deleteAdminPost: builder.mutation<errorType, string>({
      query: (id) => ({
        url: `post?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const {
  useGetAdminPostsQuery,
  useGetAdminPostQuery,
  useCreateAdminPostMutation,
  useDeleteAdminPostMutation,
} = adminPostApi;
