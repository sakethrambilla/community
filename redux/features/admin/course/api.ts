import { CourseSchema, CreateCourseSchema, UpdateCourseSchema } from "@/schema";
import { successType } from "@/types/common";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const courseApi = createApi({
  reducerPath: "courseApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/v0/admin" }),
  tagTypes: ["Course", "CourseDetail"],
  endpoints: (builder) => ({
    getCourses: builder.query<CourseSchema[], void>({
      query: () => `/classroom`,
      providesTags: ["Course"],
    }),
    getCourse: builder.query<CourseSchema, string>({
      query: (id) => `/course?courseId=${id}`,
      providesTags: ["CourseDetail"],
    }),
    createCourse: builder.mutation<successType, CreateCourseSchema>({
      query: (body) => ({
        url: `/course`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Course"],
    }),
    updateCourse: builder.mutation<successType, UpdateCourseSchema>({
      query: (body) => ({
        url: `/course`,
        method: "PATCH",
        body: body,
      }),
      invalidatesTags: ["Course"],
    }),
    deleteCourse: builder.mutation<successType, string>({
      query: (id) => ({
        url: `/course?courseId=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Course"],
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useCreateCourseMutation,
  useGetCourseQuery,
  useUpdateCourseMutation,
  useDeleteCourseMutation,
} = courseApi;
export default courseApi;
