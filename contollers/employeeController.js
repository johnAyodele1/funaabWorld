const Employee = require("../model/employeeModel");

exports.register = async (req, res, next) => {
  try {
    const employee = await Employee.create(req.body);
    // console.log(req.body, employee);
    res.status(200).json({
      status: "success",
      data: {
        employee,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
