import { combineReducers, configureStore } from "@reduxjs/toolkit";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/reducer";
import { productDetailSlice } from "./productDetail/slice";
import { productSearchSlice } from "./productSearch/slice";
import { log } from "./middlewares";

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), log],
});

export type RootState = ReturnType<typeof store.getState>;

export type Dispatch = typeof store.dispatch;

export default store;
