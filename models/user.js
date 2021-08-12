const mongoose = require("mongoose");

let userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  verification_code: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  gender: {
    type: String,
  },
  marital_status: {
    type: String,
  },
  age: {
    type: String,
  },

  role: {
    type: String,
    enum: ["ADMIN", "USER"],
    default: "USER",
  },
  password: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("User", userSchema);
