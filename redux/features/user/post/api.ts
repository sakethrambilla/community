import { CreatePostSchema } from "@/schema";
import { Post } from "@/types/user/post";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  tagTypes: ["Post"],
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `post`,
      providesTags: ["Post"],
    }),
    getPost: builder.query<Post, string>({
      query: (id) => `post/${id}`,
      providesTags: ["Post"],
    }),
    createPost: builder.mutation<Post, CreatePostSchema>({
      query: (body) => ({
        url: `post`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Post"],
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation } = postApi;
