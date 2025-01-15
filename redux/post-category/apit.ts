import { PostCategory } from "@/types/post-category";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postCategoryApi = createApi({
  reducerPath: "postCategoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/" }),
  endpoints: (builder) => ({
    getPostCategory: builder.query<PostCategory[], void>({
      query: () => `post-category`,
    }),
  }),
});

export const { useGetPostCategoryQuery } = postCategoryApi;
