import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    addUserProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { setUser, addUserProduct } = userSlice.actions;

export default userSlice.reducer;
