const express = require("express");
const router = express.Router();
const employeeController = require("../contollers/employeeController");
router.post("/createprofile", employeeController.register);
module.exports = router;
