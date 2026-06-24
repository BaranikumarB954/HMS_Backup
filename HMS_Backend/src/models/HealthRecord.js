const mongoose = require('mongoose');

const healthRecordSchema = new mongoose.Schema(
  {
    // 🔥 UNIQUE RECORD ID
    recordId: {
      type: String,
      unique: true,
      required: true
    },

    // 🔥 LINKED APPOINTMENT (MAIN CONSULTATION)
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      required: true
    },

    // 🔥 PATIENT
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },

    // 🔥 DOCTOR
    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },

    // 🔥 CLINICAL DATA
    symptoms: {
      type: String
    },

    diagnosis: {
      type: String
    },

    // 🔥 PRESCRIPTION ARRAY
    prescriptions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Prescription'
      }
    ],
    
    notes: {
      type: String
    },

    // 🔥 TEST REPORT LINKS (LAB / RAD)
    testReports: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TestReport'
      }
    ],

    // 🔥 RECORD STATUS
    status: {
      type: String,
      enum: ["DRAFT", "FINAL"],
      default: "DRAFT"
    },

    // 🔥 AUDIT FIELDS
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },

    updatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee'
    },

    // 🔥 SOFT DELETE (OPTIONAL)
    isDeleted: {
      type: Boolean,
      default: false
    }

  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('HealthRecord', healthRecordSchema);