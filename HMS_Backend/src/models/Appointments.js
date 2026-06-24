const mongoose = require('mongoose');
const { APMNT_STATUS, APMNT_TYPE } = require('../constants/basic.constant');

const appointmentSchema = new mongoose.Schema(
  {
    appointmentId: {
      type: String,
      unique: true,
      required: true
    },

    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Patient',
      required: true
    },

    doctorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Doctor',
      required: true
    },

    departmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Departments',
      required: true
    },

    appointmentDate: {
      type: Date,
      required: true
    },

    timeslot: {
      start: { type: String, required: true }, // "10:00"
      end: { type: String, required: true }    // "10:30"
    },

    status: {
      type: String,
      enum: Object.values(APMNT_STATUS),
      default: APMNT_STATUS.BOOKED
    },
    revisitRequired: {
      type: Boolean,
      default: false
    },

    parentAppointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Appointment',
      default: null
    },

    appointmentType: {
      type: String,
      enum: Object.values(APMNT_TYPE),
      default: APMNT_TYPE.CONSULTATION
    },

    createdByEmployeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true
    },
    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Appointment', appointmentSchema);