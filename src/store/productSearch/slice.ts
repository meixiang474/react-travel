import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchSearchProduct } from "api";

export interface ProductSearchState {
  loading: boolean;
  error: string | null;
  data: any;
  pagination: any;
}

const initialState: ProductSearchState = {
  loading: true,
  error: null,
  data: null,
  pagination: null,
};

export const searchProduct = createAsyncThunk(
  "productSearch/searchProduct",
  async (
    parameters: {
      keywords: string;
      nextPage: number | string;
      pageSize: number | string;
    },
    thunkAPI
  ) => {
    const { data, headers } = await fetchSearchProduct(parameters);
    return {
      data,
      pagination: headers,
    };
  }
);

export const productSearchSlice = createSlice({
  name: "productSearch",
  initialState,
  reducers: {},
  extraReducers: {
    [searchProduct.pending.type]: (state) => {
      state.loading = true;
    },
    [searchProduct.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.pagination = action.payload.pagination;
      state.error = null;
    },
    [searchProduct.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});
