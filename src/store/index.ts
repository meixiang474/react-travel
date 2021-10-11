import { combineReducers, configureStore } from "@reduxjs/toolkit";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/reducer";
import { productDetailSlice } from "./productDetail/slice";
import { productSearchSlice } from "./productSearch/slice";
import { userSlice } from "./user/slice";
import { shoppingCartSlice } from "./shoppingCart/slice";
import { log } from "./middlewares";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

// const rootPersistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user"],
// };

const userPersistConfig = {
  key: "user",
  storage,
  whitelist: ["token"],
};

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
  productDetail: productDetailSlice.reducer,
  productSearch: productSearchSlice.reducer,
  user: persistReducer(userPersistConfig, userSlice.reducer),
  shoppingCart: shoppingCartSlice.reducer,
});

// const persistedReducer = persistReducer(rootPersistConfig, rootReducer);

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => [
    // 引入默认的middleware并且防止redux-persist报错
    ...getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
    log,
  ],
});

const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;

export type Dispatch = typeof store.dispatch;

export default { store, persistor };
