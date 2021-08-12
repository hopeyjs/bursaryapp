// import Models and requirements
const User = require("../../models/user");
const crypt = require("../../utils/crypt");
const Verification = require("../../utils/verifyCodeGen.js");
const Mailer = require("../../utils/mailer");
const jwt = require("jsonwebtoken");

// get all users
exports.getUsers = async (req, res) => {
  const users = await User.find();

  try {
    if (users.length > 0) {
      return res.status(200).render("users", {
        status: "success",
        user: req.user,
        users,
        total: users.length,
      });
    } else {
      return res.status(200).render("users", {
        status: "success",
        users,
        user: req.user,
        message: "No registered user",
      });
    }
  } catch (err) {
    return res.status(501).render("users", {
      status: "failure",
      users,
      user: req.user,
      total: "users.length",
      message: "An error occured!",
    });
  }
};

// get user by id
exports.getUser = async (req, res) => {
  const currentuser = await User.findOne({ _id: req.params._id });

  try {
    if (currentuser) {
      return res.status(200).json({
        status: "success",
        currentuser,
        user: req.user,
      });
    } else {
      return res.status(200).json({
        status: "success",
        message: "User Not Registered!",
        user: req.user,
      });
    }
  } catch (err) {
    return res.status(501).json({
      status: "failure",
      message: "An error occured, user not found!",
      user: req.user,
    });
  }
};

// update user
exports.updateUser = async (req, res) => {
  let update = req.body;

  await User.findByIdAndUpdate({ _id: req.params.id }, update, { new: true })
    .then((updatedUser) => {
      return res.status(200).redirect("/dashboard");
    })
    .catch((err) => {
      return res.status(200).json({
        status: "failure",
        message: "User details not updated!",
        err,
      });
    });
};

// delete user
exports.deleteUser = async (req, res) => {
  await User.deleteOne({ _id: req.params.id })
    .then((status) => {
      return res.status(200).json({
        status: "success",
        message: "User Account Deleted!",
      });
    })
    .catch((err) => {
      return res.status(501).json({
        status: "failure",
        message: "An error occoured while deleting the user account",
        err,
      });
    });
};

// show more info page after mail verification
exports.moreInfo = async (req, res) => {
  try {
    return res.status(200).render("extrainfo", {
      status: "success",
      message: "We need a little more information",
      user: req.user,
    });
  } catch (err) {
    return res.status(200).render("extrainfo", {
      status: "success",
      message: "Sorry, An error occured!",
      user: req.user,
    });
  }
};

// show user dashboard
exports.dashboard = async (req, res) => {
  try {
    return res.status(200).render("dashboard", {});
  } catch (err) {
    return res.status(200).render("dashboard", {});
  }
};
