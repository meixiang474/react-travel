import {
  createStore,
  applyMiddleware,
  Dispatch as ReduxDispatch,
  AnyAction,
  combineReducers,
} from "redux";
import languageReducer from "./language/languageReducer";
import recommendProductsReducer from "./recommendProducts/reducer";
import thunk, { ThunkDispatch } from "redux-thunk";
import { log } from "./middlewares";

const rootReducer = combineReducers({
  language: languageReducer,
  recommendProducts: recommendProductsReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk, log));

export type RootState = ReturnType<typeof store.getState>;

export type Dispatch = ThunkDispatch<ReduxDispatch, undefined, AnyAction>;

export default store;
