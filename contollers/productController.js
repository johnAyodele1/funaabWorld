const mongoose = require("mongoose");
const Product = require("../model/productModel");
const User = require("../model/userModel");
exports.getAll = async (req, res, next) => {
  try {
    const product = await Product.find();
    res.status(200).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
// exports.getAllCategory = (option)=>{
//   async(req, res,next)=>{

//   }
// }
exports.deleteProduct = async (req, res, next) => {
  try {
    const id = req.body.id;
    await Product.findByIdAndDelete(id);
    res.status(204).json({
      status: "success",
      data: "",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.deleteProducts = async (req, res, next) => {
  try {
    await Product.deleteMany({});
    res.status(204).json({
      status: "success",
      data: "",
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.createProduct = async (req, res, next) => {
  try {
    if (!req.file) throw new Error("No file uploaded");
    const sellerID = req.body.seller;
    req.body.image = req.file.filename;
    let body = req.body;
    body.category =
      body.category.charAt(0).toLowerCase() + req.body.category.slice(1);
    const product = await Product.create(body);
    const seller = await User.findByIdAndUpdate(sellerID, {
      $push: {
        products: product._id,
      },
    });
    console.log(seller);

    if (!seller) {
      await Product.findByIdAndDelete(product._id);
      throw new Error("No seller found!");
    }
    res.status(201).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    console.log(err.message);
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
exports.getProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    if (!id) {
      throw new Error("No Id provided ");
    }
    const product = await Product.findById(id);
    if (!product) {
      throw new Error("No product with the ID provided");
    }
    res.status(201).json({
      status: "success",
      data: {
        product,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};
