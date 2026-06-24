import API from "./api";

export const signup = (data: any) => API.post("/api/auth/signup", data);

export const login = (data: any) => 
{
  console.log("Login data:", data); // 🔥 debug log
  return API.post("/api/auth/patientLogin", data);
}
export const forgotPassword = (email: string) =>
  API.post("/api/auth/forgot-password", { email });

export const resetPassword = (token: string, data: any) =>
  API.post(`/api/auth/reset-password/${token}`, data);

export const changePassword = async (newPassword: string) => {
  try {
    console.log("Before change password call api");
    const res = await API.post("/api/patients/change-password", {
      newPassword,
    });

    return res.data;
  } catch (err: any) {
    throw err?.response?.data || { message: "Something went wrong" };
  }
};