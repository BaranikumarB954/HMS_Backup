import API from "./api"; // ✅ your axios instance

// ===============================
// ✅ GET PROFILE
// ===============================
export const getPatientProfile = async () => {
  const res = await API.get("/api/patients/profile");
  return res.data.data; // important
};

// ===============================
// ✅ UPDATE PROFILE
// ===============================
export const updatePatientProfile = async (data: any) => {
  const res = await API.put("/api/patients/profile", data);
  return res.data.data;
};

// ===============================
// ✅ CHANGE PASSWORD (OPTIONAL)
// ===============================
export const changePassword = async (data: {
  oldPassword: string;
  newPassword: string;
}) => {
  try {
    const res = await API.put("/api/auth/change-password", data);

    return res.data;
  } catch (err: any) {
    throw err;
  }
};