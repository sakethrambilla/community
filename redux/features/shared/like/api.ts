import { CreateLikeSchema, UpdateLikeSchema } from "@/schema/like";
import { errorType, LikeType } from "@/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v0/" }),
  tagTypes: ["Like"],
  endpoints: (builder) => ({
    getLike: builder.query<
      LikeType,
      { postId?: string; commentId?: string; userId?: string }
    >({
      query: ({ postId, commentId, userId }) =>
        `shared/like?postId=${postId}&commentId=${commentId}&userId=${userId}`,
      providesTags: ["Like"],
    }),

    createLike: builder.mutation<LikeType, CreateLikeSchema>({
      query: (body) => ({
        url: `shared/like`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Like"],
    }),

    updateLike: builder.mutation<LikeType, UpdateLikeSchema>({
      query: (body) => ({
        url: `shared/like`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Like"],
    }),
    deleteLike: builder.mutation<errorType, string>({
      query: (id) => ({
        url: `shared/like`,
        method: "DELETE",
        body: { id },
      }),
      invalidatesTags: ["Like"],
    }),
  }),
});

export const {
  useGetLikeQuery,
  useCreateLikeMutation,
  useUpdateLikeMutation,
  useDeleteLikeMutation,
} = likeApi;
