const express = require("express");
const router = express.Router();
const upload = require("../contollers/multer");
const productController = require("../contollers/productController");
const protectController = require("../contollers/protectController");
router.post(
  "/createproduct",
  upload.single("image"),
  productController.createProduct
);
router.get("/getproducts", productController.getAll);
router.get("/product/:id", productController.getProduct);
router.delete("/deleteproducts", productController.deleteProducts);
router.delete("/deleteproduct", productController.deleteProduct);

module.exports = router;
