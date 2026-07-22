const ApiError = require('../utils/ApiError')
const generateId = require('../utils/idGenerator');
const Appointment = require('../models/Appointments');
const Patient = require('../models/Patient')
const Doctor = require('../models/Doctor')
const Employee = require('../models/Employee')
const Departments = require('../models/Departments')
const { APMNT_STATUS } = require('../constants/basic.constant');
const ROLES = require('../constants/role.constant');

const createAppointment = async (data, user) => {


  const {
    patientUHID,
    doctorEmployeeId,
    deptName,
    appointmentDate,
    timeslot,
    reason
  } = data;

  let createdById;
  let createdByModel;

  if (user.roleName === ROLES.PATIENT.roleName) {
    const patient = await Patient.findOne({ userId: user.userId });

    if (!patient) {
      throw new ApiError(404, "Patient not found");
    }

    createdById = patient._id;
    createdByModel = "Patient";
  } else {
    const employee = await Employee.findOne({ userId: user.userId });

    if (!employee) {
      throw new ApiError(404, "Employee not found");
    }

    createdById = employee._id;
    createdByModel = "Employee";
  }

  const patient = await Patient.findOne({ UHID: patientUHID });
  if (!patient) throw new ApiError(404, "Patient not found");

  const empDoctor = await Employee.findOne({ employeeId: doctorEmployeeId });
  if (!empDoctor) throw new ApiError(404, "Doctor employee not found");

  const doctor = await Doctor.findOne({ employeeId: empDoctor._id });
  if (!doctor) throw new ApiError(404, "Doctor not found");

  const department = await Departments.findOne({ deptName });
  if (!department) throw new ApiError(404, "Department not found");

  if (empDoctor.departmentId.toString() !== department._id.toString()) {
    throw new ApiError(400, "Doctor not belongs to selected department");
  }

  if (timeslot.start < doctor.avlblStartTime || timeslot.end > doctor.avlblEndTime){
    throw new ApiError(400, "Selected slot is outside doctor availability");
  }


  const conflict = await Appointment.findOne({
    doctorId: doctor._id,
    appointmentDate,
    "timeslot.start": timeslot.start,
    isDeleted: false
  });

  if (conflict) {
    throw new ApiError(409, "Doctor already booked for this slot");
  }

  const appointmentId = await generateId(`APMNT-${department.deptId}`);

  return await Appointment.create({
    appointmentId,
    patientId: patient._id,
    doctorId: doctor._id,
    departmentId: department._id,
    appointmentDate,
    timeslot,
    reason,
    createdBy: createdById,
    createdByModel
  });
};

const getAppointments = async (query) => {

  const page = parseInt(query.page) || 1;
  const limit = Math.min(parseInt(query.limit) || 10, 30);
  const skip = (page - 1) * limit;

  const filter = { isDeleted: false };

  // ✅ FILTER BY STATUS
  if (query.status && query.status !== 'ALL') {
    filter.status = query.status;
  }

  const data = await Appointment.find(filter)
    .populate('patientId')
    .populate('doctorId')
    .populate('departmentId', 'deptName')
    .skip(skip)
    .limit(limit)
    .lean();

  const total = await Appointment.countDocuments(filter);

  return {
    data,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit)
    }
  };
};

const getAppointmentById = async (id) => {

  const data = await Appointment.findById(id)
    .populate('patientId')
    .populate('doctorId')
    .populate('departmentId');

  if (!data || data.isDeleted) {
    throw new ApiError(404, "Appointment not found");
  }

  return data;
};

const updateAppointment = async (id, data) => {

  const appointment = await Appointment.findById(id);
  if (!appointment || appointment.isDeleted) {
    throw new ApiError(404, "Appointment not found");
  }

  const {
    appointmentDate,
    timeslot
  } = data;


  const doctor = await Doctor.findById(appointment.doctorId);

  // AFTER fetching doctor

// ✅ CHECK DOCTOR AVAILABILITY TIME
const { start, end } = timeslot;

if (!doctor.avlblStartTime || !doctor.avlblEndTime) {
  throw new ApiError(400, "Doctor availability not set");
}

// convert to minutes
const toMinutes = (t) => {
  const [h, m] = t.split(":").map(Number);
  return h * 60 + m;
};

const docStart = toMinutes(doctor.avlblStartTime);
const docEnd = toMinutes(doctor.avlblEndTime);
const slotStart = toMinutes(start);
const slotEnd = toMinutes(end);

// ✅ SLOT VALIDATION
if (slotStart >= slotEnd) {
  throw new ApiError(400, "Invalid time slot");
}

if (slotStart < docStart || slotEnd > docEnd) {
  throw new ApiError(
    400,
    `Slot must be between ${doctor.avlblStartTime} and ${doctor.avlblEndTime}`
  );
}

  const conflict = await Appointment.findOne({
    _id: { $ne: id },
    doctorId: appointment.doctorId,
    appointmentDate,
    "timeslot.start": timeslot.start,
    isDeleted: false
  });

  if (conflict) {
    throw new ApiError(409, "Slot already booked");
  }

  appointment.appointmentDate = appointmentDate;
  appointment.timeslot = timeslot;

  return await appointment.save();
};

const softDelete = async (id) => {

  const appointment = await Appointment.findById(id);

  if (!appointment || appointment.isDeleted) {
    throw new ApiError(404, "Appointment not found");
  }

  appointment.isDeleted = true;
  appointment.status = APMNT_STATUS.CANCELLED;

  return await appointment.save();
};

const getAvailableSlots = async (doctorEmployeeId, appointmentDate) => {

  const empDoctor = await Employee.findOne({ employeeId: doctorEmployeeId });
  if (!empDoctor) throw new ApiError(404, "Doctor employee not found");

  const doctor = await Doctor.findOne({ employeeId: empDoctor._id });
  if (!doctor) throw new ApiError(404, "Doctor not found");

  // ✅ JOINING DATE VALIDATION
  const selectedDate = new Date(appointmentDate);
  const joiningDate = new Date(empDoctor.joiningDate);

  if (selectedDate < joiningDate) {
    throw new ApiError(400, "Doctor not joined on selected date");
  }

  // ✅ NO PAST DATE
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const selected = new Date(appointmentDate);
  selected.setHours(0, 0, 0, 0);

  if (selected < today) {
    throw new ApiError(400, "Past dates are not allowed");
  }

  // ✅ SLOT GENERATION
  const slots = [];

  const toMinutes = (t) => {
    const [h, m] = t.split(":").map(Number);
    return h * 60 + m;
  };

  const toTime = (m) => {
    const h = Math.floor(m / 60);
    const min = m % 60;
    return `${String(h).padStart(2, "0")}:${String(min).padStart(2, "0")}`;
  };

  let current = toMinutes(doctor.avlblStartTime);
  const end = toMinutes(doctor.avlblEndTime);

  while (current + 30 <= end) {
    slots.push({
      start: toTime(current),
      end: toTime(current + 30)
    });

    current += 30;
  }

  // ✅ IF TODAY → REMOVE PAST TIME SLOTS
  const isToday =
    selected.getTime() === today.getTime();

  let filteredSlots = slots;

  if (isToday) {
    const now = new Date();
    const currentMinutes =
      now.getHours() * 60 + now.getMinutes();

    filteredSlots = slots.filter(
      slot => toMinutes(slot.start) > currentMinutes
    );
  }

  // ✅ REMOVE BOOKED SLOTS
  const booked = await Appointment.find({
    doctorId: doctor._id,
    appointmentDate: selectedDate,
    isDeleted: false
  });

  // ✅ MARK SLOTS WITH BOOKED STATUS
  const finalSlots = filteredSlots.map(slot => {
    const isBooked = booked.some(
      b => b.timeslot.start === slot.start
    );

    return {
      start: slot.start,
      end: slot.end,
      isBooked
    };
  });

  return finalSlots;
};

const updateAppointmentStatus = async (id, status) => {

  const appointment = await Appointment.findById(id);

  if (!appointment || appointment.isDeleted) {
    throw new ApiError(404, "Appointment not found");
  }

  appointment.status = status;

  return await appointment.save();
};

const getMyAppointments = async (userId) => {

  // ✅ 1. GET PATIENT FROM USER
  const patient = await Patient.findOne({ userId });

  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  // ✅ 2. GET APPOINTMENTS
  const appointments = await Appointment.find({
    patientId: patient._id,
    isDeleted: false
  })

    // 🔥 DOCTOR FULL INFO
    .populate({
      path: 'doctorId',
      populate: {
        path: 'employeeId',
        populate: {
          path: 'userId',
          select: 'firstName lastName'
        }
      }
    })

    // 🔥 DEPARTMENT
    .populate('departmentId', 'deptName')

    // 🔥 SORT LATEST FIRST
    .sort({ appointmentDate: -1, "timeslot.start": 1 })

    .lean();

  return appointments;
};

module.exports = { createAppointment , getAppointments, getAppointmentById, updateAppointment, softDelete,getAvailableSlots,updateAppointmentStatus,getMyAppointments};

