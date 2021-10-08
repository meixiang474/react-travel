import axios from "axios";

export const request = axios.create({
  headers: {
    "x-icode": "8C24FFA4B834E422",
  },
  baseURL: "http://123.56.149.216:8080/api/",
});

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);
