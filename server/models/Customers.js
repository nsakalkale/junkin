const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: true,
  },
  lname: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  phoneno: {
    type: Number,
    required: true,
    length: 10,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Customer = mongoose.model("Customer", CustomerSchema);

module.exports = Customer;
