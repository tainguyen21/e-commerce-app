import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { collection, getDocs, getFirestore } from "firebase/firestore";

const db = getFirestore();

const initialState = [];

export const fetchProducts = createAsyncThunk(
  "products/featchProducts",
  async (params, thunkAPI) => {
    const productsRef = await collection(db, "products");
    const productsSnapShot = await getDocs(productsRef);
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
  reducers: {},
  extraReducers: {
    [fetchProducts.fulfilled]: (state, action) => {
      return action.payload;
    },
  },
});

export const {} = productsSlice.actions;

export default productsSlice.reducer;
