const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const userRoutes = require("./Routes/userRoutes");
const candidateRoutes = require("./Routes/candidatesRoutes");
const employeeRoutes = require("./Routes/employeeRoutes");

const cors = require("cors");
const app = express();
app.use(cors());
app.use(bodyParser.json());
require("dotenv").config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(
    "mongodb+srv://dhirenpatyal7:superpassword@cluster0.jo0de.mongodb.net/hr_management"
  )
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

const port = 5000;

app.use("/api/user", userRoutes);
app.use("/api/candidate", candidateRoutes);
app.use("/api/employee", employeeRoutes);

app.listen(port, function () {
  console.log(`Server connected to port ${port}`);
});
