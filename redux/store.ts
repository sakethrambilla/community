import { configureStore } from "@reduxjs/toolkit";
import { postApi } from "./post/api";
import { postCategoryApi } from "./post-category/apit";

export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [postCategoryApi.reducerPath]: postCategoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      postCategoryApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
