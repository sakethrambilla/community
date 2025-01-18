import { CreateCommentSchema, UpdateCommentSchema } from "@/schema";
import { errorType } from "@/types";
import { CommentType } from "@/types/comment";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v0/" }),
  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    getComments: builder.query<
      CommentType[],
      {
        postId: string;
        userId: string;
      }
    >({
      query: ({ postId, userId }) =>
        `shared/comment?postId=${postId}&userId=${userId}`,
      providesTags: ["Comment"],
    }),

    createComment: builder.mutation<CommentType, CreateCommentSchema>({
      query: (body) => ({
        url: `shared/comment`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Comment"],
    }),

    updateComment: builder.mutation<CommentType, UpdateCommentSchema>({
      query: (body) => ({
        url: `shared/comment`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Comment"],
    }),
    deleteComment: builder.mutation<
      errorType,
      {
        id: string;
        userId: string;
      }
    >({
      query: ({ id, userId }) => ({
        url: `shared/comment?id=${id}&userId=${userId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Comment"],
    }),
  }),
});

export const {
  useGetCommentsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentApi;
