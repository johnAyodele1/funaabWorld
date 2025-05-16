const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A employee must have a name"],
  },
  phoneNumber: {
    type: String,
    required: [true, "A  employee must have a phone Number"],
    unique: true,
  },
  city: {
    type: String,
    required: [true, "A employee must be from a city"],
  },
  state: {
    type: String,
    required: [true, "A employee must be from a state"],
  },
  education: {
    type: String,
    default: "SSCE",
    enum: ["BSC", "SSCE", "OND", "HND"],
  },
});

const Employee = mongoose.model("Employee", employeeSchema);
module.exports = Employee;
