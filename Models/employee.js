const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema(
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
    experience: {
      type: String,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    joining: {
      type: String,
      required: true,
    },
    designation: {
      type: String,
      required: true,
    },
    task: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const employee = mongoose.model("employee", EmployeeSchema);

module.exports = employee;
