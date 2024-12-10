const mongoose = require("mongoose");

const CandidateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: ["New", "Scheduled", "Selected", "Rejected"],
    },
    experience: {
      type: String,
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const candidate = mongoose.model("candidate", CandidateSchema);

module.exports = candidate;
