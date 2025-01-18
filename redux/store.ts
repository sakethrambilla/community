import { configureStore } from "@reduxjs/toolkit";
import { commentApi } from "./features/shared/comment/api";
import { likeApi } from "./features/shared/like/api";
import { postCategoryApi } from "./features/shared/post-category/api";
import { postApi } from "./features/shared/post/api";
import { userDetailsApi } from "./user-details/api";
export const store = configureStore({
  reducer: {
    [postApi.reducerPath]: postApi.reducer,
    [postCategoryApi.reducerPath]: postCategoryApi.reducer,
    [userDetailsApi.reducerPath]: userDetailsApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      postApi.middleware,
      postCategoryApi.middleware,
      userDetailsApi.middleware,
      commentApi.middleware,
      likeApi.middleware,
    ),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
