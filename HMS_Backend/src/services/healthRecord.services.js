const HealthRecord = require("../models/HealthRecord");
const ApiError = require("../utils/ApiError");
const Prescription = require("../models/Prescription");
const generateId = require("../utils/idGenerator")
const Appointment = require("../models/Appointments");
const Patient = require("../models/Patient");
const Doctor = require("../models/Doctor")
const createHealthRecord = async (data, employeeId) => {

    // ✅ Find appointment using business appointmentId
    const appointment = await Appointment.findOne({
        appointmentId: data.appointmentId
    });

    if (!appointment) {
        throw new ApiError(404, "Appointment not found");
    }

    // ✅ Check whether health record already exists
    const existing = await HealthRecord.findOne({
        appointmentId: appointment._id
    });

    if (existing) {
        throw new ApiError(
            400,
            "Health record already exists for this appointment"
        );
    }

    console.log("Patient ID: ",appointment.patientId)
    
    // ✅ Create Health Record
    const healthRecord = new HealthRecord({
        recordId: await generateId("HR"),

        appointmentId: appointment._id,

        patientId: appointment.patientId,

        doctorId: appointment.doctorId,

        symptoms: data.symptoms || "",

        diagnosis: data.diagnosis || "",

        notes: data.notes || "",

        isLabRequired: data.isLabRequired || false,

        isRadiologyRequired: data.isRadiologyRequired || false,

        createdBy: employeeId,

        updatedBy: employeeId
    });

    await healthRecord.save();

    // ✅ Save prescriptions
    if (
        Array.isArray(data.prescriptions) &&
        data.prescriptions.length > 0
    ) {

        const prescriptionIds = [];

        for (const item of data.prescriptions) {

            const prescription = new Prescription({
                healthRecordId: healthRecord._id,

                name: item.name,

                strength: item.strength,

                timing: {
                    morning: item.timing?.morning || false,
                    afternoon: item.timing?.afternoon || false,
                    night: item.timing?.night || false,
                    foodTiming: item.timing?.foodTiming || "AFTER_FOOD",
                    durationDays: item.timing?.durationDays || 1
                },

                instructions: item.instructions || ""
            });

            await prescription.save();

            prescriptionIds.push(prescription._id);
        }

        healthRecord.prescriptions = prescriptionIds;

        await healthRecord.save();
    }

    return await HealthRecord.findById(healthRecord._id)
        .populate("appointmentId")
        .populate("patientId")
        .populate("doctorId")
        .populate("prescriptions")
        .populate("testReports");
};

const getAllHealthRecords = async () => {

    return await HealthRecord.find({
        isDeleted: false
    })
        .populate({
            path: "appointmentId",
            select: "appointmentId appointmentDate appointmentTime"
        })
        .populate({
            path: "patientId",
            select: "UHID userId",
            populate: {
                path: "userId",
                select: "firstName lastName"
            }
        })
        .populate({
            path: "doctorId",
            select: "employeeId",
            populate: {
                path: "employeeId",
                populate: {
                    path: "userId",
                    select: "firstName lastName"
                }
            }
        })
        .populate("prescriptions")
        .populate("testReports")
        .sort({ createdAt: -1 });

};

const getByAppointment = async(appointmentId)=>{
    return await HealthRecord.findOne({
        appointmentId
    }).populate("patientId")
    .populate("doctorId")
    .populate("prescriptions")
    .populate("testReports");
}

const updateHealthRecord = async(id,data)=>{
    return await HealthRecord.findByIdAndUpdate(id,data,{
        new:true
    })
}

module.exports = {
    createHealthRecord,
    getByAppointment,
    updateHealthRecord,
    getAllHealthRecords,
}