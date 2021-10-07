import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },

    addSavingPost: (state, action) => {
      if (state.saving.indexOf(action.payload) === -1) {
        state.saving.push(action.payload);
      }
    },

    addUserProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const { setUser, addUserProduct, addSavingPost } = userSlice.actions;

export default userSlice.reducer;
