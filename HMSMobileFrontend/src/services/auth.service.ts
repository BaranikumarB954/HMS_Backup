import API from "./api";

export const signup = (data: any) => API.post("/api/auth/signup", data);

export const login = (data: any) => 
{
  console.log("Login data:", data); // 🔥 debug log
  return API.post("/api/auth/login", data);
}
export const forgotPassword = (email: string) =>
  API.post("/api/auth/forgot-password", { email });

export const resetPassword = (token: string, data: any) =>
  API.post(`/api/auth/reset-password/${token}`, data);