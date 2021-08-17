const express = require("express");
const app = express();

// import middleware
const authCheck = require("./middlewares/auth");
const upload = require("./middlewares/upload");

// input controllers
const AuthController = require("./controllers/authentication/auth.controller");
const UsermanagerController = require("./controllers/user/userManager.controller");
const BursaryController = require("./controllers/bursary/bursary.controller");

// define routes
// home page
app.get("/", AuthController.home);

// contact page
app.get("/contact", AuthController.contact);

// authentication
app.get("/login", AuthController.loginPage);
app.post("/login", AuthController.login);
app.get("/signup", AuthController.signupPage);
app.post("/signup", AuthController.signup);
app.get("/logout", AuthController.logout);
app.get("/verifymail", AuthController.verifyMailPage);
app.post("/verifymail", AuthController.verifyMail);

// dashboard
app.get("/dashboard", UsermanagerController.dashboard);

// Bursary
app.get("/applicationfee", BursaryController.applicationFeePage);
app.post("/applicationfee", BursaryController.payapplicationFee);
app.get("/paymentsuccessful", BursaryController.payapplicationFee);
app.get("/applyforbursary", BursaryController.applyForBursaryPage);
app.post("/applyforbursary", BursaryController.applyForBursary);
app.get("/bursarystatus", BursaryController.applicationStatus);

module.exports = app;
