const appointmentService = require('../services/appointment.services');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('express-async-handler');



exports.createAppointment = asyncHandler( async (req, res, next) => {
    const data = req.body;
    const user = req.user;

    const appointment = await appointmentService.createAppointment(data,user);
    return res.status(201).send(new ApiResponse(201,appointment));
  
});

exports.getAppointments = asyncHandler(async(req,res)=>{
  const result = await appointmentService.getAppointments(req.query);
    return res.status(200).json(new ApiResponse(200, result));
})

exports.getAppointmentById = asyncHandler(async(req,res)=>{
  const data = await appointmentService.getAppointmentById(req.params.id);
  return res.status(200).json(new ApiResponse(200, data));

})

exports.updateAppointment = asyncHandler(async(req,res)=>{
    const data = await appointmentService.updateAppointment(req.params.id, req.body);
    return res.status(200).json(new ApiResponse(200, data));
})

exports.deleteAppointment = asyncHandler(async(req,res)=>{
  const data = await appointmentService.softDelete(req.params.id);
  return res.status(200).json(new ApiResponse(200, data));
})

exports.getSlots = asyncHandler(async (req, res) => {
  const { doctorEmployeeId, appointmentDate } = req.query;

  const slots = await appointmentService.getAvailableSlots(
    doctorEmployeeId,
    appointmentDate
  );

  res.status(200).json(new ApiResponse(200, slots));
});

exports.updateAppointmentStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;

  const data = await appointmentService.updateAppointmentStatus(
    req.params.id,
    status
  );

  return res.status(200).json(new ApiResponse(200, data));
});

exports.getMyAppointments = asyncHandler(async(req,res)=>{
  const userId = req.user.userId;
  const data = await appointmentService.getMyAppointments(userId);
  return res.status(200).json(new ApiResponse(200,data));
})