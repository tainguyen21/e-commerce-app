import { configureStore } from "@reduxjs/toolkit";
import userSlice from "features/Auth/userSlice";
import productsSlice from "features/Product/productsSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
    products: productsSlice,
  },
});
