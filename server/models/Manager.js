const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema({
  mid: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const Manager = mongoose.model("Manager", ManagerSchema);

module.exports = Manager;
