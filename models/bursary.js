const mongoose = require("mongoose");

let bursarySchema = new mongoose.Schema({
  scheme: {
    type: String,
    required: true,
  },
  eligibleApplicants: {
    type: Number,
    required: true,
  },
  applicationFee: {
    type: Number,
  },
  applicants: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
  ],
  potentialWinners: {
    type: Number,
  },
});

module.exports = mongoose.model("Bursary", bursarySchema);
