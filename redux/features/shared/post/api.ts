import { CreatePostSchema } from "@/schema";
import { AdminPost, errorType, Post } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v0/" }),
  tagTypes: ["AdminPost", "UserPost"],
  endpoints: (builder) => ({
    getAdminPosts: builder.query<AdminPost[], void>({
      query: () => `admin/post`,
      providesTags: ["AdminPost"],
    }),
    getAdminPost: builder.query<AdminPost, string>({
      query: (id) => `admin/post/${id}`,
      providesTags: ["AdminPost"],
    }),
    getUserPosts: builder.query<
      Post[],
      {
        categoryId?: string;
        page: number;
      }
    >({
      query: ({ categoryId, page }) =>
        `user/post?categoryId=${categoryId}&page=${page}`,
      providesTags: ["UserPost"],
    }),
    getUserPost: builder.query<Post, string>({
      query: (id) => `user/post/${id}`,
      providesTags: ["UserPost"],
    }),
    createPost: builder.mutation<AdminPost, CreatePostSchema>({
      query: (body) => ({
        url: `shared/post`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["UserPost", "AdminPost"],
    }),
    deletePost: builder.mutation<errorType, string>({
      query: (id) => ({
        url: `shared/post?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UserPost", "AdminPost"],
    }),
  }),
});

export const {
  useGetAdminPostsQuery,
  useGetAdminPostQuery,
  useCreatePostMutation,
  useDeletePostMutation,
  useGetUserPostsQuery,
  useGetUserPostQuery,
} = postApi;
