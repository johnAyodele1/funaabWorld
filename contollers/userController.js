const User = require("../model/userModel");

const jwt = require("jsonwebtoken");
const axios = require("axios");
const { email: sendEmail } = require("../email.js");

const idToken = (user) => {
  return jwt.sign({ id: user.id }, process.env.JWT_PASS, {
    expiresIn: "7d",
  });
};
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = idToken(user);
    const date = new Date().toISOString();
    // const message = `You have successfully created your account at ${date}.`;
    // console.log(user);
    // await sendEmail({
    //   to: user.email,
    //   subject: "Account Creation",
    //   text: message,
    // });
    res.status(201).json({
      status: "success",
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    let user = await User.findOne({ email }).select("+password");
    if (!user || !user.comparePassword(password)) {
      throw new Error("Incorrect Email address or password");
    }
    const token = idToken(user);
    const subject = "Login Notification";
    try {
      await sendEmail(email, subject, "You have successfully logged in");
      res.status(200).json({
        status: "success",
        token,
        user,
      });
      console.log("email sent");
    } catch (err) {
      console.log(err.message);
    }
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
// log in users

exports.login = async (req, res, next) => {
  try {
    // check if the body contain email and password
    if (!req.body.email || !req.body.password) {
      throw new Error("Please provide email and password");
    }
    // check if the user exist and the password is correct
    const user = await User.findOne({ email }).select("+password");
    if (!user || !user.comparePassword(req.body.password)) {
      throw new Error("Invalid Email or Password");
    }
    // generate token
    const token = idToken(user);
    res.json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
// reset password via otp

// exports.forgotPassword = async (req, res, next) => {

// }
