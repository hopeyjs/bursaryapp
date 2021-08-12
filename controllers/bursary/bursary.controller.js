const Bursary = require("../../models/bursary");

// application fee page
exports.applicationFeePage = (req, res) => {
  return res.status(200).render("applicationfee", {
    message: "",
  });
};

// Pay application fee
exports.payapplicationFee = (req, res) => {
  return res.render("paymentmade", {
    message: "",
  });
};

// apply after payment page
exports.applyForBursaryPage = (req, res) => {
  return res.status(200).render("applyforbursary", {
    message: "",
  });
};

// apply after payment
exports.applyForBursary = (req, res) => {};

// check application status
exports.applicationStatus = (req, res) => {};
