import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  collection,
  getDocs,
  getFirestore,
  limit,
  query,
} from "firebase/firestore";

const db = getFirestore();

const initialState = [];

export const fetchProducts = createAsyncThunk(
  "products/featchProducts",
  async (params, thunkAPI) => {
    const productsRef = collection(db, "products");
    const q = query(productsRef, limit(9));
    const productsSnapShot = await getDocs(q);
    const products = [];

    productsSnapShot.forEach((product) => {
      const data = product.data();
      const id = product.id;

      products.push({
        ...data,
        id,
      });
    });

    return products;
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },

    removeProduct: (state, action) => {
      const filteredProduct = state.filter(
        (product) => product.id !== action.payload
      );

      return filteredProduct;
    },

    updateProduct: (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    },
  },
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const { addProduct, removeProduct, updateProduct } =
  productsSlice.actions;

export default productsSlice.reducer;
