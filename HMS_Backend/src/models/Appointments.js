const mongoose = require("mongoose");
const {
  APMNT_STATUS,
  APMNT_TYPE
} = require("../constants/basic.constant");

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      unique: true,
      required: true
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Patient",
      required: true
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Departments",
      required: true
    },

    appointmentDate: {
      type: Date,
      required: true
    },

    timeslot: {
      start: {
        type: String,
        required: true
      },
      end: {
        type: String,
        required: true
      }
    },

    status: {
      type: String,
      enum: Object.values(APMNT_STATUS),
      default: APMNT_STATUS.BOOKED
    },

    appointmentType: {
      type: String,
      enum: Object.values(APMNT_TYPE),
      default: APMNT_TYPE.CONSULTATION
    },

    reason: {
      type: String,
      default: null
    },

    revisitRequired: {
      type: Boolean,
      default: false
    },

    parentAppointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      default: null
    },

    // NEW
    healthRecordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthRecord",
      default: null
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: "createdByModel"
    },

    createdByModel: {
      type: String,
      enum: ["Employee", "Patient"],
      required: true
    },

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Appointment", appointmentSchema);