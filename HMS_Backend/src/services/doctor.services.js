const Doctor = require('../models/Doctor');
const Employee = require('../models/Employee');
const Departments = require('../models/Departments');
const ApiError = require('../utils/ApiError');
const { STATUS } = require('../constants/basic.constant');
const User = require('../models/User');
const Appointment = require('../models/Appointments');
const { bookingDepartments } = require('../constants/dept.constant');

const getDoctorsByDept = async (deptName) => {

  const department = await Departments.findOne({ deptName });
  if (!department) throw new ApiError(404, "Department not found");


  const employees = await Employee.find({
    departmentId: department._id
  }).populate({
    path: 'userId',
    select: 'firstName lastName email phone status'
  });


  const empIds = employees.map(emp => emp._id);


  const doctors = await Doctor.find({
    employeeId: { $in: empIds }
  });


  const empMap = new Map();
  employees.forEach(emp => {
    empMap.set(emp._id.toString(), emp);
  });


  return doctors.map(doc => {
    const emp = empMap.get(doc.employeeId.toString());

    return {
      employeeId: emp.employeeId, // ✅ DOC-260001
      name: `${emp.userId.firstName} ${emp.userId.lastName}`,
      avlblStartTime: doc.avlblStartTime,
      avlblEndTime: doc.avlblEndTime
    };
  });
};


const updateDoctor = async (empObjectId, data) => {

  const emp = await Employee.findOne({ employeeId: empObjectId });
  if (!emp) throw new ApiError(404, "Employee not found");

  const doctor = await Doctor.findOne({ employeeId: emp._id });
  if (!doctor) throw new ApiError(404, "Doctor not found");

  // ✅ Doctor update (no change)
  Object.assign(doctor, {
    medRegNo: data.medRegNo,
    specialization: data.specialization,
    qualification: data.qualification,
    consultationFee: data.consultationFee,
    avlblStartTime: data.avlblStartTime,
    avlblEndTime: data.avlblEndTime,
    expYears: data.expYears
  });

  // 🔥 FIX HERE (important)
  Object.assign(emp, {
    designation: data.designation,
    joiningDate: data.joiningDate 
      ? new Date(data.joiningDate) 
      : emp.joiningDate
  });

  // ✅ User update
  await User.findByIdAndUpdate(emp.userId, {
    firstName: data.firstName,
    lastName: data.lastName,
    phone: data.phone,
    email: data.email
  });

  await doctor.save();
  await emp.save();

  return { message: "Doctor updated successfully" };
};

const getDoctorsInfoByDept = async (deptName) => {

  const department = await Departments.findOne({ deptName });
  if (!department) throw new ApiError(404, "Department not found");

  const employees = await Employee.find({
    departmentId: department._id
  }).populate({
    path: 'userId',
    select: 'firstName lastName email phone status'
  });

  const empIds = employees.map(emp => emp._id);

  const doctors = await Doctor.find({
    employeeId: { $in: empIds }
  });

  const empMap = new Map();
  employees.forEach(emp => {
    empMap.set(emp._id.toString(), emp);
  });

  return doctors.map(doc => {
    const emp = empMap.get(doc.employeeId.toString());

    return {
      empObjectId: emp._id, // 🔥 IMPORTANT FOR UPDATE
      employeeId: emp.employeeId,

      firstName: emp.userId.firstName,
      lastName: emp.userId.lastName,
      email: emp.userId.email,
      phone: emp.userId.phone,
      status: emp.userId.status,

      designation: emp.designation,
      joiningDate: emp.joiningDate,

      medRegNo: doc.medRegNo,
      specialization: doc.specialization,
      qualification: doc.qualification,
      consultationFee: doc.consultationFee,
      avlblStartTime: doc.avlblStartTime,
      avlblEndTime: doc.avlblEndTime,
      expYears: doc.expYears
    };
  });
};

const checkDoctor = async (empId) => {

  const emp = await Employee.findOne({ employeeId: empId });
  if (!emp) throw new ApiError(404, "Doctor employee not found");

  const doctor = await Doctor.findOne({ employeeId: emp._id });
  if (!doctor) throw new ApiError(404, "Doctor not found");

  return {
    employeeId: emp.employeeId,
    status : STATUS.ACTIVE,
    message: "Doctor exists"
  };
};

const getDoctorDashboard = async(userId)=>{

  const employee = await Employee.findOne({ userId }).populate('departmentId');
  if (!employee) throw new Error("Employee not found");


  const doctor = await Doctor.findOne({ employeeId: employee._id });
  if (!doctor) throw new Error("Doctor not found");


  const user = await User.findById(userId);


  const todayStart = new Date();
  todayStart.setHours(0,0,0,0);

  const todayEnd = new Date();
  todayEnd.setHours(23,59,59,999);





  const todayAppointments = await Appointment.countDocuments({
    doctorId: doctor._id,
    appointmentDate: { $gte: todayStart, $lte: todayEnd },
    isDeleted: false
  });

  const completed = await Appointment.countDocuments({
    doctorId: doctor._id,
    status: "COMPLETED",
    appointmentDate: { $gte: todayStart, $lte: todayEnd },
    isDeleted: false
  });

  const pending = await Appointment.countDocuments({
    doctorId: doctor._id,
    status: "BOOKED",
    appointmentDate: { $gte: todayStart, $lte: todayEnd },
    isDeleted: false
  });

  const cancelled = await Appointment.countDocuments({
    doctorId: doctor._id,
    status: "CANCELLED",
    appointmentDate: { $gte: todayStart, $lte: todayEnd },
    isDeleted: false
  });





  const appointments = await Appointment.find({
    doctorId: doctor._id,
    appointmentDate: { $gte: todayStart, $lte: todayEnd },
    isDeleted: false
  })
    .populate('patientId', 'UHID')
    .populate('departmentId', 'deptName')
    .sort({ "timeslot.start": 1 })
    .lean();

  return {
    doctorInfo: {
      name: `${user.firstName} ${user.lastName}`,
      department: employee.departmentId?.deptName,
      specialization: doctor.specialization
    },

    stats: {
      todayAppointments,
      completed,
      pending,
      cancelled
    },

    todayAppointments: appointments
  };

}

const getDoctorFullInfo = async (empId) => {
  const emp = await Employee.findOne({ employeeId: empId });
  if (!emp) throw new ApiError(404, "Employee not found");

  const doctor = await Doctor.findOne({ employeeId: emp._id });
  if (!doctor) throw new ApiError(404, "Doctor not found");

  return {
    employeeId: emp.employeeId,
    avlblStartTime: doctor.avlblStartTime,
    avlblEndTime: doctor.avlblEndTime
  };
}

const getDoctorsApmntDept = async()=>{  
  return bookingDepartments;
}

const getTopDoctorsByDept = async () => {

  const result = await Appointment.aggregate([

    // ✅ Ignore deleted
    {
      $match: { isDeleted: false }
    },

    // ✅ Count appointments per doctor
    {
      $group: {
        _id: "$doctorId",
        totalAppointments: { $sum: 1 }
      }
    },

    // ✅ Join Doctor
    {
      $lookup: {
        from: "doctors",
        localField: "_id",
        foreignField: "_id",
        as: "doctor"
      }
    },
    { $unwind: "$doctor" },

    // ✅ Join Employee
    {
      $lookup: {
        from: "employees",
        localField: "doctor.employeeId",
        foreignField: "_id",
        as: "employee"
      }
    },
    { $unwind: "$employee" },

    // ✅ Join User (for name)
    {
      $lookup: {
        from: "users",
        localField: "employee.userId",
        foreignField: "_id",
        as: "user"
      }
    },
    { $unwind: "$user" },

    // ✅ Join Department
    {
      $lookup: {
        from: "departments",
        localField: "employee.departmentId",
        foreignField: "_id",
        as: "department"
      }
    },
    { $unwind: "$department" },

    // ✅ Format
    {
      $project: {
        doctorId: "$_id",
        totalAppointments: 1,
        deptName: "$department.deptName",

        employeeId: "$employee.employeeId",
        firstName: "$user.firstName",
        lastName: "$user.lastName",

        specialization: "$doctor.specialization",
        consultationFee: "$doctor.consultationFee",
        avlblStartTime: "$doctor.avlblStartTime",
        avlblEndTime: "$doctor.avlblEndTime",
        expYears: "$doctor.expYears"
      }
    },

    // ✅ Sort by performance
    {
      $sort: { totalAppointments: -1 }
    }

  ]);

  // ✅ Group in JS (top 3 per dept)
  const grouped = {};

  result.forEach(doc => {
    if (!grouped[doc.deptName]) {
      grouped[doc.deptName] = [];
    }

    if (grouped[doc.deptName].length < 3) {
      grouped[doc.deptName].push(doc);
    }
  });

  return Object.keys(grouped).map(dept => ({
    deptName: dept,
    doctors: grouped[dept]
  }));
};

module.exports = { getDoctorFullInfo,getDoctorsByDept,checkDoctor,getDoctorsInfoByDept, updateDoctor,getDoctorDashboard, getDoctorsApmntDept, getTopDoctorsByDept};