const Employee = require("../Models/employee");

const addEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      position,
      experience,
      department,
      joining,
      designation,
      task,
      status,
    } = req.body;

    const newEmployee = new Employee({
      name,
      email,
      phone,
      position,
      experience,
      department,
      joining,
      designation,
      task,
      status,
    });

    const savedEmployee = await newEmployee.save();

    res.status(201).json({
      message: "Employee added successfully",
      employee: savedEmployee,
    });
  } catch (error) {
    console.error("Error adding employee:", error);
    res.status(500).json({
      message: "Error adding employee",
      error: error.message,
    });
  }
};

const getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({
      message: "Employees fetched successfully",
      employees,
    });
  } catch (error) {
    console.error("Error fetching employees:", error);
    res.status(500).json({
      message: "Error fetching employees",
      error: error.message,
    });
  }
};

const deleteEmployee = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEmployee = await Employee.findByIdAndDelete(id);

    if (!deletedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully",
      employee: deletedEmployee,
    });
  } catch (error) {
    console.error("Error deleting employee:", error);
    res.status(500).json({
      message: "Error deleting employee",
      error: error.message,
    });
  }
};

const updateEmployee = async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(id, updatedData, {
      new: true,
      runValidators: true,
    });

    if (!updatedEmployee) {
      return res.status(404).json({
        message: "Employee not found",
      });
    }

    res.status(200).json({
      message: "Employee updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating employee:", error);
    res.status(500).json({
      message: "Error updating employee",
      error: error.message,
    });
  }
};

const updateEmployeeStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (
      !status ||
      !["Present", "Absent", "Work From Home", "Medical Leave"].includes(status)
    ) {
      return res.status(400).json({ error: "Invalid status" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedEmployee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json({
      message: "Employee status updated successfully",
      employee: updatedEmployee,
    });
  } catch (error) {
    console.error("Error updating status:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateEmployee = updateEmployee;
exports.deleteEmployee = deleteEmployee;
exports.getAllEmployees = getAllEmployees;
exports.addEmployee = addEmployee;
exports.updateEmployeeStatus = updateEmployeeStatus;
