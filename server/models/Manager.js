const mongoose = require("mongoose");

const CustomerSchema = new mongoose.Schema({
  mid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Manager = mongoose.model("Manager", CustomerSchema);

module.exports = Manager;
