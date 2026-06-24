import API from "./api";

// ✅ GET APPOINTMENTS
export const getAppointments = async (params?: any) => {
  const res = await API.get("/api/appointments/getAppointments", { params });
  return res.data.data;
};

// ✅ GET SLOTS
export const getSlots = async (doctorEmployeeId: string, appointmentDate: string) => {
  const res = await API.get("/api/appointments/slots", {
    params: { doctorEmployeeId, appointmentDate },
  });
  return res.data.data;
};



// ✅ CREATE APPOINTMENT
export const createAppointment = async (data: any) => {
  const res = await API.post("/api/appointments/addAppointment", data);
  return res.data.data;
};


export const getMyAppointments = async () => {
  try {
    const res = await API.get("/api/appointments/myAppointments");
    console.log(res.data.data);
    return res.data.data; // ✅ clean list

  } catch (err: any) {
    console.log("My appointments error:", err);
    throw err;
  }
};

export const cancelAppointment = async (id: string) => {
  try {
    const res = await API.put(
      `/api/appointments/updateStatus/${id}`,
      { status: "CANCELLED" }
    );

    return res.data;

  } catch (err: any) {
    console.log("Cancel error:", err);
    throw err?.response?.data || {
      message: "Cancel failed"
    };
  }
};

export const getAvailableSlots = async (doctorId: string) => {
  const res = await API.get(`/api/appointment/available-slots/${doctorId}`);
  return res.data.data;
};

export const rescheduleAppointment = async (
  appointmentId: string,
  payload: any
) => {
  const res = await API.put(
    `/api/appointment/reschedule/${appointmentId}`,
    payload
  );
  return res.data;
};