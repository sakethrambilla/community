import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export const fileUploadApi = createApi({
  reducerPath: "fileUploadApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v0/" }),
  tagTypes: ["FileUpload"],
  endpoints: (builder) => ({
    uploadFile: builder.mutation<
      {
        fileUrl: string;
      },
      {
        file: File;
        contentType: string;
      }
    >({
      query: (body) => ({
        url: `shared/file-upload`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["FileUpload"],
    }),
  }),
});

export const { useUploadFileMutation } = fileUploadApi;
