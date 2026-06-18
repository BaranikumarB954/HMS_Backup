import axios from "axios";
import { storage } from "../utils/storage";

const API = axios.create({
  baseURL: "http://10.0.2.2:5000",
});

// 🔥 attach token automatically
API.interceptors.request.use(async (config) => {
  const token = await storage.getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// 🔥 response standard handling
API.interceptors.response.use(
  (res) => res,
  (err) => {
    const message =
      err?.response?.data?.message || "Something went wrong";
    return Promise.reject({ message, data: err?.response?.data });
  }
);

export default API;