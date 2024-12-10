const express = require("express");
const userControllers = require("../Controllers/userController");

const router = express.Router();

router.post("/register", userControllers.createUser);
router.post("/login", userControllers.loginUser);
router.delete("/:id", userControllers.deleteUser);
router.post("/logout", userControllers.logoutUser);
module.exports = router;
