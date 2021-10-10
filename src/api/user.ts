import { request } from "./config";

export function registerAPI(parameters: {
  email: string;
  password: string;
  confirmPassword: string;
}) {
  return request.post<any, any>("/auth/register", parameters);
}

export function signInAPI(parameters: { email: string; password: string }) {
  return request.post<any, { token: string }>("/auth/login", parameters);
}
