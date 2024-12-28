import { CreatePostSchema } from "@/schema";
import { Post } from "@/types/post";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getPosts: builder.query<Post[], void>({
      query: () => `post`,
    }),
    createPost: builder.mutation<Post, CreatePostSchema>({
      query: (body) => ({
        url: `post`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useGetPostsQuery, useCreatePostMutation } = postApi;
