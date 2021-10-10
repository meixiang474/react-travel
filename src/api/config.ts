import axios from "axios";

export const request = axios.create({
  headers: {
    "x-icode": "8C24FFA4B834E422",
  },
  baseURL: "http://123.56.149.216:8080/",
});

request.interceptors.request.use((config) => {
  return config;
});

request.interceptors.response.use(
  (res) => {
    // 兼容分页
    if (res.headers["x-pagination"]) {
      return {
        data: res.data,
        headers: JSON.parse(res.headers["x-pagination"]),
      };
    }
    return res.data;
  },
  (err) => {
    return Promise.reject(err);
  }
);
