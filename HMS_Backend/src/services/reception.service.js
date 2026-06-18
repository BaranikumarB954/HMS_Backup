const ApiError = require('../utils/ApiError')
const User = require('../models/User')
const Roles = require('../models/Roles')
const ROLES = require('../constants/role.constant')
const Appointment = require('../models/Appointments')
const Patient = require('../models/Patient')
const Employee = require('../models/Employee')
const Departments = require('../models/Departments')
const { APMNT_STATUS, STATUS } = require('../constants/basic.constant')
const Doctor = require('../models/Doctor')
const getDashboardData = async()=>{

    const patientRole = await Roles.findOne({ roleName: ROLES.PATIENT.roleName });

let totalPatients = 0;
let activePatients = 0;
let inactivePatients = 0;

if (patientRole) {

  const patients = await Patient.find()
    .populate({
      path: 'userId',
      populate: {
        path: 'roleId'
      }
    });

  totalPatients = patients.length;

  activePatients = patients.filter(p =>
  p.userId?.status === STATUS.ACTIVE &&
  p.userId?.roleId?.roleName?.toUpperCase() === ROLES.PATIENT.roleName
).length;

inactivePatients = patients.filter(p =>
  p.userId?.status === STATUS.INACTIVE &&
  p.userId?.roleId?.roleName?.toUpperCase() === ROLES.PATIENT.roleName
).length;

}

    const totalAppointments = await Appointment.countDocuments({isDeleted:false});

    const pendingAppointments = await Appointment.countDocuments({
    status: APMNT_STATUS.BOOKED,
    isDeleted: false
  });

  const completedAppointments = await Appointment.countDocuments({
    status: APMNT_STATUS.COMPLETED,
    isDeleted: false
  });

  const rejectedAppointments = await Appointment.countDocuments({
    status: APMNT_STATUS.CANCELLED,
    isDeleted: false
  });

   const completedAppts = await Appointment.find({
    status: APMNT_STATUS.COMPLETED,
    isDeleted: false
  }).populate("doctorId");
  
  let totalRevenue = 0;

  completedAppts.forEach(appt => {
    if (appt.doctorId?.consultationFee) {
      totalRevenue += appt.doctorId.consultationFee;
    }
  });

  const doctors = await Doctor.find().populate({
    path: 'employeeId',
    populate: {
      path: 'userId',
      select: 'status'
    }
  });

  const totalDoctors = doctors.length;

  const activeDoctors = doctors.filter(d =>
    d.employeeId?.userId?.status === STATUS.ACTIVE
  ).length;

  const inactiveDoctors = doctors.filter(d =>
    d.employeeId?.userId?.status === STATUS.INACTIVE
  ).length;

  return {
    patients: {
      total: totalPatients,
      active: activePatients,
      inactive: inactivePatients
    },
    appointments: {
      total: totalAppointments,
      pending: pendingAppointments,
      completed: completedAppointments,
      rejected: rejectedAppointments
    },
    revenue: totalRevenue,
    doctors: {
      total: totalDoctors,
      active: activeDoctors,
      inactive: inactiveDoctors
    }
  };
};

module.exports = {getDashboardData,}