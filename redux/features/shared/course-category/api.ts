import { CourseCategorySchema } from "@/schema";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const courseCategoryApi = createApi({
  reducerPath: "courseCategoryApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v0/shared/" }),
  tagTypes: ["CourseCategory"],
  endpoints: (builder) => ({
    getCourseCategory: builder.query<CourseCategorySchema[], void>({
      query: () => `course-category`,
      providesTags: ["CourseCategory"],
    }),
  }),
});

export const { useGetCourseCategoryQuery } = courseCategoryApi;
