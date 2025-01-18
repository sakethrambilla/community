import type { RootState } from "@/redux/store";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define a type for the slice state
interface CounterState {
  value: "list" | "card";
}

// Define the initial state using that type
const initialState: CounterState = {
  value: "list",
};

export const postViewSlice = createSlice({
  name: "postView",
  initialState,
  reducers: {
    setPostView: (state, action: PayloadAction<"list" | "card">) => {
      state.value = action.payload;
    },
  },
});

export const { setPostView } = postViewSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectPostView = (state: RootState) => state.postView.value;

export default postViewSlice.reducer;
