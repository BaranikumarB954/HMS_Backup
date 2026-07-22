const mongoose = require("mongoose");

const prescriptionSchema = new mongoose.Schema(
  {
    healthRecordId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "HealthRecord",
      required: true
    },

    name: {
      type: String,
      required: true
    },

    strength: {
      type: String,
      required: true
    },

    timing: {
      morning: { type: Boolean, default: false },
      afternoon: { type: Boolean, default: false },
      night: { type: Boolean, default: false },

      foodTiming: {
        type: String,
        enum: ["BEFORE_FOOD", "AFTER_FOOD"],
        default: "AFTER_FOOD"
      },

      durationDays: {
        type: Number,
        required: true
      }
    },

    instructions: {
      type: String,
      default: ""
    },

    isDeleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Prescription", prescriptionSchema);