import { Middleware } from "redux";

export const log: Middleware = (store) => (next) => (action) => {
  console.log("state 当前", store.getState());
  console.log("fire action", action);
  const res = next(action);
  console.log("state 更新", store.getState());
  return res;
};
