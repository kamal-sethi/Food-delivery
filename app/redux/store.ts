import { configureStore, createSlice } from "@reduxjs/toolkit";
import userSlice from "./userSlice";
import { ChartNoAxesColumnIncreasing } from "lucide-react";
import cartSlice from "./cartSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    cart: cartSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
