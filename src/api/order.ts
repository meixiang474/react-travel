import { request } from "./config";

export function placeOrderAPI(parameters: { orderId: string }) {
  return request.post<any, any>(`/api/orders/${parameters.orderId}/placeOrder`);
}
