const asyncHandler = require("express-async-handler");
const healthService = require("../services/healthRecord.services");
const ApiResponse = require("../utils/ApiResponse");

exports.createHealthRecord = asyncHandler(async(req,res)=>{
    const record = await healthService.createHealthRecord(req.body);
    return res.status(201).send(new ApiResponse(201,record));
})

exports.getAllHealthRecords = asyncHandler(async(req,res,next)=>{
    const records = await healthService.getAllHealthRecords();
    return res.status(200).send(new ApiResponse(200,records));
})

exports.getByAppointment = asyncHandler(async(req,res)=>{
    const appointmentId = req.params.appointmentId;
    const record = await healthService.getByAppointment(appointmentId);
    return res.status(200).send(new ApiResponse(200,record));
})

exports.updateHealthRecord = asyncHandler(async(req,res)=>{
    const id = req.params.id;
    const record = await healthService.updateHealthRecord(id,req.body);
})