import API from "./api";

// 🔥 GET DOCTORS LIST BY DEPT
export const getDoctorsInfoByDept = async (dept: string) => {
  try {
    const res = await API.get("/api/doctor/getDocInfoByDept", {
      params: { dept },
    });

    // ✅ ALWAYS RETURN PURE DATA
    return res.data.data;

  } catch (err: any) {
    console.log(
      "Doctor list error:",
      err?.response?.data || err.message
    );

    throw err?.response?.data || {
      message: "Failed to fetch doctors",
    };
  }
};


// 🔥 GET SINGLE DOCTOR FULL INFO
export const getDoctorFullInfo = async (empId: string) => {
  try {
    const res = await API.get("/api/doctor/getDoctorFullInfo", {
      params: { empId },
    });

    // ✅ CLEAN RETURN
    return res.data.data;

  } catch (err: any) {
    console.log(
      "Doctor full info error:",
      err?.response?.data || err.message
    );

    throw err?.response?.data || {
      message: "Failed to fetch doctor info",
    };
  }
};


// 🔥 GET BOOKING DEPARTMENTS (NEW)
export const getBookingDepts = async () => {
  try {
    const res = await API.get("/api/doctor/doctorDepartments");

    return res.data.data;

  } catch (err: any) {
    console.log(
      "Dept error:",
      err?.response?.data || err.message
    );

    throw err?.response?.data || {
      message: "Failed to fetch departments",
    };
  }
};

export const getTopDoctorsByDept = async () => {
  try {
    const res = await API.get("/api/doctor/topDoctorsByDept");
    return res.data.data;
  } catch (err: any) {
    console.log("Top doctors error:", err);
    throw err;
  }
};