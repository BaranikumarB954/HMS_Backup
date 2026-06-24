const ApiError = require('../utils/ApiError')
const generateId = require('../utils/idGenerator');
const User = require('../models/User')
const bcrypt = require("bcrypt");
const Patient = require('../models/Patient')
const Roles = require('../models/Roles')
const userService = require('./user.services');
const { STATUS } = require('../constants/basic.constant');
const sendEmail = require('../utils/sendEmail');
const { patientAccountTemplate } = require('../utils/templates/emailTemplates');
const ROLES = require('../constants/role.constant');
const AuthSession = require('../models/AuthSession');

const createPatientByUserId = async(userId)=>{
    const role = await Roles.findOne({roleName : "PATIENT"});
    if(!role){
        throw new ApiError(404,'Role not found');
    }

    const UHID = await generateId(role.roleId);
    const existingPatient = await Patient.findOne({userId})
    if(existingPatient){
        throw new ApiError(409,'Patient already exists');
    }

    const patient = new Patient({
        userId,
        UHID
    });

    return await patient.save();
}

const createPatientRecord = async (patientDetails) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    password,
    gender,
    dob,
    bloodGroup,
    street,
    city,
    state,
    pincode,
    emgContName,
    emgContPhone
  } = patientDetails;


  const newPatUser = await userService.createBasicUser({
    firstName,
    lastName,
    email,
    phone,
    password
  });


  const newPatient = await createPatientByUserId(newPatUser._id);


  newPatient.gender = gender;
  newPatient.dob = dob;
  newPatient.bloodGroup = bloodGroup;


  newPatient.address = {
    street,
    city,
    state,
    pincode
  };

  newPatient.emgContName = emgContName;
  newPatient.emgContPhone = emgContPhone;


  newPatient.isProfileCompleted = true;

  const role = await Roles.findOne({ roleId: ROLES.PATIENT.roleId });
  if (!role) {
      throw new ApiError(404, 'Role not found');
  }
  newPatUser.roleId = role._id;
  newPatUser.status = STATUS.ACTIVE;
  await newPatUser.save();


  await newPatient.save();

  const loginUrl = `${process.env.FRONTEND_URL}/auth/login`;

  await sendEmail({
    to : email,
    subject: "HMS - Your Patient Account",
    html : patientAccountTemplate({
      name : firstName + " " + lastName,
      email,
      password,
      loginUrl
    })
  })
  return newPatient;
};


const getAllPatients = async () => {

  const patients = await Patient.find({isDeleted:false})
    .populate({
      path: 'userId',
      select: 'firstName lastName email phone status'
    })
    .lean();

  return patients.map(p => ({
    patientId: p._id,
    UHID: p.UHID,
    fullName: `${p.userId.firstName} ${p.userId.lastName}`,
    email: p.userId.email,
    phone: p.userId.phone,
    gender: p.gender,
    bloodGroup: p.bloodGroup,
    city: p.address?.city || '',
    state: p.address?.state || '',
    isProfileCompleted: p.isProfileCompleted,
    status: p.userId.status,
    userId: p.userId._id
  }));
};

const checkPatient = async (UHID) => {
  console.log("Check patient running in service layer");

  const patient = await Patient.findOne({ 
    UHID: UHID.toUpperCase().trim()
  });

  if (!patient) {
    throw new ApiError(404, "Patient not found");
  }

  return {
    UHID: patient.UHID,
    status: STATUS.ACTIVE,
    name: "Patient Found"
  };
};

const updatePatient = async (id, data) => {
  const patient = await Patient.findById(id);
  if (!patient) throw new ApiError(404, "Patient not found");

  const user = await User.findById(patient.userId);

  Object.assign(user, {
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone
  });

  await user.save();

  Object.assign(patient, {
    gender: data.gender,
    dob: data.dob,
    bloodGroup: data.bloodGroup,
    address: {
      street: data.street,
      city: data.city,
      state: data.state,
      pincode: data.pincode
    },
    emgContName: data.emgContName,
    emgContPhone: data.emgContPhone
  });

  await patient.save();

  return { message: "Updated successfully" };
};

const deletePatient = async (id) => {
  const patient = await Patient.findById(id);
  if (!patient) throw new ApiError(404, "Patient not found");


  patient.isDeleted = true;
  await patient.save();


  const user = await User.findById(patient.userId);
  if (user) {
    user.status = STATUS.INACTIVE;
    await user.save();
  }

  return { message: "Patient deleted successfully" };
};

const togglePatientStatus = async (userId) => {
  const user = await User.findById(userId);

  user.status =
    user.status === STATUS.ACTIVE ? STATUS.INACTIVE : STATUS.ACTIVE;

  await user.save();

  return { status: user.status };
};

const getPatientProfile = async(userId)=>{
  console.log("Profile service running");
  const user = await User.findById(userId).select("-passwordHash");
  console.log("USER ID : ",userId)
  if(!user){
    throw new ApiError(404,"User not found");
  }
  const patient = await Patient.findOne({userId : user._id});
  if(!patient){
    throw new ApiError(404,"Patient not found");
  }

  return {user,patient};
  
}


const updatePatientProfile = async (userId, body) => {
  const {
    firstName,
    lastName,
    phone,
    gender,
    dob,
    bloodGroup,
    street,
    city,
    state,
    pincode,
    emgContName,
    emgContPhone,
  } = body;

  // 🔹 UPDATE USER
  const user = await User.findByIdAndUpdate(
    userId,
    { firstName, lastName, phone },
    { new: true }
  );

  if (!user) throw new ApiError(404, "User not found");

  // 🔹 UPDATE PATIENT
  const patient = await Patient.findOneAndUpdate(
    { userId },
    {
      gender,
      dob,
      bloodGroup,
      address: {
        street,
        city,
        state,
        pincode,
      },
      emgContName,
      emgContPhone,
    },
    { new: true }
  );

  if (!patient) throw new ApiError(404, "Patient not found");

  // 🔹 PROFILE COMPLETE CHECK
  const isComplete =
    gender &&
    dob &&
    bloodGroup &&
    city &&
    emgContName &&
    emgContPhone;

  patient.isProfileCompleted = !!isComplete;
  await patient.save();

  return { user, patient };
};

const changePatientPassword = async (userId, newPassword) => {
  console.log("Change password for the patient service file running and ", userId, " and ",newPassword)
  const user = await User.findById(userId).select("+passwordHash");

  if (!user) throw new ApiError(404, "User not found");

  const hash = await bcrypt.hash(newPassword, 10);

  user.passwordHash = hash;
  await user.save();

  await AuthSession.updateMany(
    {userId : user._id},
    {isRevoked:true}
  )
};

module.exports = {createPatientByUserId,createPatientRecord,getAllPatients,checkPatient,updatePatient,deletePatient,togglePatientStatus,getPatientProfile,updatePatientProfile,changePatientPassword }

