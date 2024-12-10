const express = require("express");
const router = express.Router();
const EmployeeController = require("../Controllers/employeeController");

router.post("/add", EmployeeController.addEmployee);
router.get("/all", EmployeeController.getAllEmployees);
router.delete("/delete/:id", EmployeeController.deleteEmployee);
router.put("/update/:id", EmployeeController.updateEmployee);
router.put("/update-status/:id", EmployeeController.updateEmployeeStatus);

module.exports = router;
