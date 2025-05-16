const express = require("express");
const router = express.Router();
const userController = require("../contollers/userController");
router.post("/create", userController.createUser);
router.post("/login", userController.signIn);
module.exports = router;
