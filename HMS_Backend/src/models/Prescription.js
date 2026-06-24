const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema(
  {
    // 🔥 LINK TO HEALTH RECORD
    healthRecordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'HealthRecord',
      required: true
    },

    // 🔥 MEDICINE NAME
    name: {
      type: String,
      required: true
    },

    // 🔥 DOSAGE
    dosage: {
      type: String,
      required: true
    },

    // 🔥 DURATION
    duration: {
      type: String,
      required: true
    },

    // 🔥 OPTIONAL INSTRUCTIONS
    instructions: {
      type: String
    }

  },
  { timestamps: true }
);

module.exports = mongoose.model('Prescription', prescriptionSchema);