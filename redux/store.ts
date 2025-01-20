import { configureStore } from "@reduxjs/toolkit";
import courseApi from "./features/admin/course/api";
import { commentApi } from "./features/shared/comment/api";
import { courseCategoryApi } from "./features/shared/course-category/api";
import { fileUploadApi } from "./features/shared/file-upload/api";
import { likeApi } from "./features/shared/like/api";
import { postCategoryApi } from "./features/shared/post-category/api";
import { postApi } from "./features/shared/post/api";
import { postViewSlice } from "./features/user/post-toggle/slice";
import { userDetailsApi } from "./user-details/api";
export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [postCategoryApi.reducerPath]: postCategoryApi.reducer,
    [userDetailsApi.reducerPath]: userDetailsApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    [courseApi.reducerPath]: courseApi.reducer,
    [courseCategoryApi.reducerPath]: courseCategoryApi.reducer,
    [fileUploadApi.reducerPath]: fileUploadApi.reducer,
    postView: postViewSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      postCategoryApi.middleware,
      userDetailsApi.middleware,
      commentApi.middleware,
      likeApi.middleware,
      courseApi.middleware,
      courseCategoryApi.middleware,
      fileUploadApi.middleware,
    ),
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
