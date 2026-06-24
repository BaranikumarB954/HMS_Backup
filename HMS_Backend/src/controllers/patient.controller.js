const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('express-async-handler');
const patientService = require('../services/patient.services')

exports.getPatients = asyncHandler(async(req,res)=>{
    const data = await patientService.getAllPatients();
    return res.status(200).send(new ApiResponse(200,data));
})

exports.addPatient = asyncHandler(async(req,res)=>{
    const patient = await patientService.createPatientRecord(req.body);
    return res.status(201).send(new ApiResponse(201,patient));
})

exports.checkPatient = asyncHandler(async(req,res)=>{
    const { UHID } = req.params;
    console.log("Check patient running in controller layer with UHID : ",UHID);
    const data = await patientService.checkPatient(UHID);

    return res.status(200).json(new ApiResponse(200, data));

})

exports.updatePatient = asyncHandler(async (req, res) => {
  const data = await patientService.updatePatient(req.params.id, req.body);
  res.status(200).json(new ApiResponse(200, data));
});

exports.deletePatient = asyncHandler(async (req, res) => {
  const data = await patientService.deletePatient(req.params.id);
  res.status(200).json(new ApiResponse(200, data));
});

exports.togglePatientStatus = asyncHandler(async (req, res) => {
  const data = await patientService.togglePatientStatus(req.params.userId);
  res.status(200).json(new ApiResponse(200, data));
});

exports.getPatientProfile = asyncHandler(async(req,res)=>{
  const userId = req.user.userId;
  console.log("USER FROM TOKEN : ",req.user, " USER ID : ", userId);

  const data = await patientService.getPatientProfile(userId);
  res.status(200).json(new ApiResponse(200,data));
})

exports.updatePatientProfile = asyncHandler(async (req, res) => {
  const userId = req.user.userId;

  const data = await patientService.updatePatientProfile(userId, req.body);

  res.status(200).json(new ApiResponse(200, data, "Profile updated"));
});

// 🔹 CHANGE PASSWORD
exports.changePassword = asyncHandler(async (req, res) => {
  const userId = req.user.userId;
  const { newPassword } = req.body;

  await patientService.changePatientPassword(userId, newPassword);

  res.status(200).json(new ApiResponse(200, {}, "Password updated"));
});