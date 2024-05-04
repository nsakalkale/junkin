const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  custid: {
    type: String,
    required: true,
  },
  orderid: {
    type: String,
    required: true,
  },
  orderdate: {
    type: Date, // Changed to Date type
    required: true,
  },
  orderstatus: {
    type: String,
    required: true,
  },
  ordertotal: {
    type: Number, // Changed to Number type
    required: true,
  },
  orderitems: {
    type: Array,
    required: true,
  },
  txnid: {
    type: String, // Changed to String type
    required: true,
  },
  paymentstatus: {
    type: String,
    required: true,
  },
});

const Order = mongoose.model("Order", OrderSchema);

module.exports = Order;
