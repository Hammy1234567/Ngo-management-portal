const mongoose = require("mongoose");
const ngoSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    logo: {
      type: String,
      required: true,
    },

    type: {
      type: String,
      required: true,
    },

    phoneNumber: {
      type: String,
      required: true,
    },
    website: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    timings: {
      type: Array,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    activities: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    donation: {
      type: Number,
      default: 1000,
    },
  },
  {
    timestamps: true,
  }
);

const NgoModel = mongoose.model("ngos", ngoSchema);
module.exports = NgoModel;
9;
