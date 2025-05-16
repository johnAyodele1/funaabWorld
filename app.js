const express = require("express");
const app = express();
const cors = require("cors");
const productRoutes = require("./routes/productRoutes");
const userRoutes = require("./routes/userRoutes");
const Employee = require("./model/employeeModel");
const employeeRoutes = require("./routes/employeeRoutes");
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/uploads", express.static("uploads"));
app.use("/", productRoutes);
app.use("/users", userRoutes);
app.use("/employee", employeeRoutes);
app.all("*", (req, res) => {
  res.status(400).json({
    status: "fail",
    message: "Route not found",
  });
});
module.exports = app;
