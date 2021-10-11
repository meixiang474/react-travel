import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  addShoppingCartItemAPI,
  clearShoppingCartItemAPI,
  getShoppingCartAPI,
} from "api";

interface ShoppingCartState {
  loading: boolean;
  error: string | null;
  items: any[];
}

const initialState: ShoppingCartState = {
  loading: true,
  error: null,
  items: [],
};

export const getShoppingCart = createAsyncThunk(
  "shoppingCart/getShoppingCart",
  async () => {
    const { shoppingCartItems } = await getShoppingCartAPI();
    return shoppingCartItems;
  }
);

export const addShoppingCartItem = createAsyncThunk(
  "shoppingCart/addShoppingCartItem",
  async (parameters: { touristRouteId: string | number }) => {
    const { shoppingCartItems } = await addShoppingCartItemAPI(parameters);
    return shoppingCartItems;
  }
);

export const clearShoppingCartItem = createAsyncThunk(
  "shoppingCart/clearShoppingCartItem",
  (parameters: { itemIds: number[] }) => {
    return clearShoppingCartItemAPI(parameters);
  }
);

export const shoppingCartSlice = createSlice({
  name: "shoppingCart",
  initialState,
  reducers: {},
  extraReducers: {
    [getShoppingCart.pending.type]: (state) => {
      state.loading = true;
    },
    [getShoppingCart.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload;
    },
    [getShoppingCart.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [addShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
    },
    [addShoppingCartItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload;
    },
    [addShoppingCartItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [clearShoppingCartItem.pending.type]: (state) => {
      state.loading = true;
    },
    [clearShoppingCartItem.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.error = null;
      state.items = [];
    },
    [clearShoppingCartItem.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});
