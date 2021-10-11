import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { signInAPI } from "api";

export interface UserState {
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  token: null,
  loading: false,
  error: null,
};

export const signIn = createAsyncThunk(
  "user/signIn",
  async (parameters: { email: string; password: string }, thunkAPI) => {
    const { token } = await signInAPI(parameters);
    return token;
  }
);

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logOut: (state) => {
      state.token = null;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: {
    [signIn.pending.type]: (state) => {
      state.loading = true;
    },
    [signIn.fulfilled.type]: (state, action) => {
      state.loading = false;
      state.token = action.payload;
      state.error = null;
    },
    [signIn.rejected.type]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
  },
});

export const userSliceActions = userSlice.actions;
