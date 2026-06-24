import axios from "axios";
import { storage } from "../utils/storage";
import { router } from "expo-router";

// 🔥 CREATE INSTANCE
const API = axios.create({
  baseURL: "http://10.0.2.2:5000/", // ✅ FIXED
});

// ✅ REQUEST INTERCEPTOR (ATTACH ACCESS TOKEN)
API.interceptors.request.use(
  async (config) => {
    const token = await storage.getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

// 🔥 RESPONSE INTERCEPTOR (AUTO REFRESH)
API.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // 🔴 TOKEN EXPIRED
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = await storage.getRefreshToken();

        if (!refreshToken) {
          throw new Error("No refresh token");
        }

        // 🔥 CALL REFRESH API
        const res = await axios.post(
          "http://10.0.2.2:5000/api/auth/refresh",
          { refreshToken }
        );

        const newAccessToken = res.data.data.accessToken;

        // ✅ SAVE NEW TOKEN
        await storage.setToken(newAccessToken);

        // ✅ UPDATE HEADER
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // ✅ RETRY ORIGINAL REQUEST
        return API(originalRequest);

      } catch (refreshError) {
        console.log("Refresh failed → Logout");

        await storage.clearAll();

        router.replace("/auth/login");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default API;