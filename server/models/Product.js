const mongoose = require("mongoose");

// Define the schema
const ProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  img_url: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  vnvg: {
    type: String,
    required: true,
  },
});

// Create a Mongoose model
const Product = mongoose.model("Product", ProductSchema);

// Export the model
module.exports = Product;
