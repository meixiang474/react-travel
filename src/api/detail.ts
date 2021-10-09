import { request } from "./config";

export const fetchProductById = (id: string | number) => {
  return request.get<any, any>(`/touristRoutes/${id}`);
};
