const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "A product must have a name"],
      unique: true,
    },
    seller: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
      required: [true, "A product must have a seller"],
    },
    price: {
      type: String,
      required: [true, "A product must have a price."],
    },
    priceDiscount: String,
    description: {
      type: String,
      required: [true, "A product must have a description."],
    },
    size: {
      type: String,
      required: [true, "A product must have a Size."],
    },
    quantity: {
      type: Number,
      default: 100,
      required: [true, "A product must have a specific quantity"],
    },
    image: {
      type: String,
      required: [true, "A Product must have a photo"],
    },
    category: {
      type: String,
      required: [true, "a product must have a category"],
    },
    rating: Number,
    ratingQuantity: Number,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "seller",
    select: "name email phoneNumber",
  });
  next();
});
// const bannedId = "680ee41148b40e4a7b9e8c17";
// productSchema.pre(/^find/, function (next) {
//   this.find({ _id: { $ne: bannedId } });
//   next();
// });

const Product = mongoose.model("Product", productSchema);
module.exports = Product;
