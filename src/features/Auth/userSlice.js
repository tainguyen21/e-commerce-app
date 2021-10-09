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

    removeSavingPost: (state, action) => {
      const index = state.saving.indexOf(action.payload);
      if (index !== -1) {
        state.saving.splice(index, 1);
      }
    },

    addFollowing: (state, action) => {
      if (state.following.indexOf(action.payload) === -1) {
        state.following.push(action.payload);
      }
    },

    removeFollowing: (state, action) => {
      const index = state.following.indexOf(action.payload);
      if (index !== -1) {
        state.following.splice(index, 1);
      }
    },

    removeProductOfUser: (state, action) => {
      const index = state.products.indexOf(action.payload);

      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },

    updateUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },

    addUserProduct: (state, action) => {
      state.products.push(action.payload);
    },
  },
});

export const {
  setUser,
  addUserProduct,
  addSavingPost,
  addFollowing,
  removeFollowing,
  updateUser,
  removeSavingPost,
  removeProductOfUser,
} = userSlice.actions;

export default userSlice.reducer;
