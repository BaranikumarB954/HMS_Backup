const mongoose = require("mongoose");
const {
  HEALTH_RECORD_STATUS
} = require("../constants/basic.constant");

require("./TestReport")
const healthRecordSchema = new mongoose.Schema(
  {
    recordId: {
      type: String,
      unique: true,
      required: true
    },

    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
      required: true,
      unique: true
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

    symptoms: {
      type: String,
      default: ""
    },

    diagnosis: {
      type: String,
      default: ""
    },

    notes: {
      type: String,
      default: ""
    },

    prescriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Prescription"
      }
    ],

    testReports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "TestReport"
      }
    ],

    // NEW
    isLabRequired: {
      type: Boolean,
      default: false
    },

    // NEW
    isRadiologyRequired: {
      type: Boolean,
      default: false
    },

    status: {
      type: String,
      enum: Object.values(HEALTH_RECORD_STATUS),
      default: HEALTH_RECORD_STATUS.DRAFT
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee"
    },

    // NEW
    finalizedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: null
    },

    // NEW
    finalizedAt: {
      type: Date,
      default: null
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

module.exports = mongoose.model(
  "HealthRecord",
  healthRecordSchema
);