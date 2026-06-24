const mongoose = require('mongoose');

const testReportSchema = new mongoose.Schema({
  appointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },

  parentAppointmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Appointment',
    required: true
  },

  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },

  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Doctor'
  },

  type: {
    type: String,
    enum: ["LAB", "RAD"],
    required: true
  },

  status: {
    type: String,
    enum: ["PENDING", "IN_PROGRESS", "COMPLETED"],
    default: "PENDING"
  },

  reportSummary: {
    type: String
  },

  reportData: {
    type: String // simple text instead of file (your requirement)
  }

}, { timestamps: true });

module.exports = mongoose.model('TestReport', testReportSchema);