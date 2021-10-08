import { request } from "./config";

export const getProductCollections = () => {
  return request.get<any[], any[]>("/productCollections");
};
