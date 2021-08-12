const crypt = require("../../utils/crypt");
const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const Verification = require("../../utils/verifyCodeGen.js");
const Mailer = require("../../utils/mailer");

// show home page
exports.home = async (req, res) => {
  return res.status(200).render("index");
};

// show login page
exports.loginPage = async (req, res) => {
  return res.status(200).render("login", {
    message: "",
  });
};

// perform login
exports.login = async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  if (!user) {
    return res.status(404).render("index", {
      status: "success",
      message: "Invalid login Details!",
    });
  }

  await crypt
    .decrypt(req.body.password, user.password)
    .then((info) => {
      if (!info) {
        return res.status(200).render("login", {
          status: "success",
          message: "Invalid Login Details!",
          info,
        });
      }

      let token = jwt.sign(
        {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          role: user.role,
          phone: user.phone,
        },
        "dontguessit"
      );

      // set auth cookie
      res.cookie("token", token);
      req.user = token;
      res.redirect("/dashboard");
    })
    .catch((err) => {
      console.log(err);
      return res.status(501).render("login", {
        message: "Incorrect Username or Password!",
      });
    });
};

// show signup page
exports.signupPage = (req, res) => {
  return res.status(200).render("signup", {
    message: "",
  });
};

exports.logout = (req, res) => {
  res.clearCookie("token");
  return res.redirect("/");
};

// create User
exports.signup = async (req, res) => {
  // define variables
  let user = {
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    phone: req.body.phone,
    gender: req.body.gender,
    marital_status: req.body.marital,
    age: req.body.age,
    verification_code: await Verification.generateCode(),
    password: await crypt.encrypt(req.body.password),
  };

  // create user
  User.create(user)
    .then((user) => {
      // set token
      let token = jwt.sign(
        {
          id: user._id,
          firstname: user.firstname,
          lastname: user.lastname,
          email: user.email,
          phone: user.phone,
          gender: user.gender,
          marital_status: user.marital_status,
          age: user.age,
        },
        "dontguessit"
      );

      // set auth cookie
      res.cookie("token", token);
      req.user = token;

      // send mail verification code to user's mail
      // define the mail options
      const mail = {
        from: "Bursary <support@netwareitsolutions.com>",
        to: user.email,
        subject: "Welcome To The Bursary",
        text: `Please use ${user.verification_code} to verify your email.`,
      };

      Mailer.sendMail(mail);

      // send Account Details Sms
      let options = {
        // Set the numbers you want to send to in international format
        to: `+234${user.phone}`,
        // Set your message
        message: `Hello ${user.firstname} your account has been created, your username is: ${user.email}, and your password is ${req.body.password}, Thank you for registering.`,
        // Set your shortCode or senderId
        // from: 'XXYYZZ'
      };
      //    SMSEngine.sendSMS(options);

      return res.status(201).render("index", {
        message:
          "Your account has been created, a verification code has been sent to your email, please use the code to verify your email or click the link provided below to verify your email.",
      });
    })
    .catch((err) => {
      console.log(err);
      return res.status(501).render("signup", {
        status: "failure",
        message: `Account not created, ${JSON.stringify(err.keyValue)
          .split(":")[1]
          .slice(0, -1)} already exists! `,
      });
    });
};

// show verification code page
exports.verifyMailPage = async (req, res) => {
  return res.status(200).render("mailverify", {
    status: "success",
    user: req.user,
    message:
      "Your account has been created successfully, please check your email to verify your account.",
  });
};

// verify user mail
exports.verifyMail = async (req, res) => {
  // find user
  const user = await User.findOne({ email: req.user.email });

  // check user verification code if match with submitted verification code
  if (user.verification_code == req.body.verification_code) {
    // verify user or throw error
    User.findOneAndUpdate(
      { email: req.user.email },
      {
        verified: true,
      },
      { new: true }
    ).then((user) => {
      return res.status(200).render("mailverified", {
        user: req.user,
        status: "success",
        message: "Your Mail has been successfully verified",
      });
    });
  } else {
    return res.status(501).render("mailverify", {
      user: req.user,
      status: "failure",
      message: "Invalid verification code provided",
    });
  }
};
