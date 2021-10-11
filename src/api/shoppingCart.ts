import { request } from "./config";

export function getShoppingCartAPI() {
  return request.get<any, { shoppingCartItems: any[] }>("/api/shoppingCart");
}

export function addShoppingCartItemAPI(parameters: {
  touristRouteId: string | number;
}) {
  return request.post<any, { shoppingCartItems: any[] }>(
    "/api/shoppingCart/items",
    parameters
  );
}

export function clearShoppingCartItemAPI(parameters: { itemIds: number[] }) {
  return request.delete<any, any>(
    `/api/shoppingCart/items/(${parameters.itemIds.join(",")})`
  );
}
