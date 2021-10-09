import { request } from "./config";

export function fetchSearchProduct(parameters: {
  keywords: string;
  nextPage: string | number;
  pageSize: string | number;
}) {
  const params: Record<string, string | number> = {
    pageNumber: parameters.nextPage,
    pageSize: parameters.pageSize,
  };

  if (parameters.keywords) {
    params.keywords = parameters.keywords;
  }

  return request.get<any, any>(`/touristRoutes`, { params });
}
