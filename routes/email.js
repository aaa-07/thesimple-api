var express = require("express");
require("dotenv").config({ path: "../.env" });
const nodemailer = require("nodemailer");
var router = express.Router();
const multer = require("multer");
const UserModel = require("../model/User");
const { json } = require("body-parser");

// Configure multer for file upload
const upload = multer({ dest: "uploads/" });

router.post("/details", upload.single("file"), (req, res) => {
  const achieveArray = JSON.parse(req.body.achieve.replace(/'/g, '"'));
  const servicesArray = JSON.parse(req.body.services.replace(/'/g, '"'));
  const budgetArray = JSON.parse(req.body.budget.replace(/'/g, '"'));
  var achieveValue = '';
  var servicesValue ='';
  var budgetValue ='';
  for (var i = 0; i < achieveArray.length; i++) {
    if (i < achieveArray.length - 1) {
      achieveValue += achieveArray[i] + ', ';
    } else {
      achieveValue += achieveArray[i];
    }
  }
  console.log(achieveValue);
  for (var i = 0; i < servicesArray.length; i++) {
    if (i < servicesArray.length - 1) {
      servicesValue += servicesArray[i] + ', ';
    } else {
      servicesValue += servicesArray[i];
    }
  }
  console.log(servicesValue);
  for (var i = 0; i < budgetArray.length; i++) {
    if (i < budgetArray.length - 1) {
      budgetValue += budgetArray[i] + ', ';
    } else {
      budgetValue += budgetArray[i];
    }
  }
  console.log(budgetValue);
  console.log("achievevalue is " + achieveValue);
  console.log(typeof achieveValue);
  console.log(req.body.fullName);
  console.log(typeof(req.body.fullName));
  const user = new UserModel({
    fullName: req.body.fullName,
    email: req.body.email,
    brandName: req.body.brandName,
    website: req.body.website,
    achieve: {
      desc: "What do you want to achieve?",
      value: achieveValue,
    },
    services: {
      desc: "What services do you need?",
      value: servicesValue,
    },
    budget: {
      desc: "Budget range",
      value: budgetValue,
    },
  });
  // Configure Nodemailer with your email service credentials
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER_GMAIL,
      pass: process.env.USER_PASS,
    },
  });

  // Email configuration
  const mailOptions = {
    from: "anoopgejje1999@gmail.com",
    to: "anoopgejje1999@gmail.com",
    subject: "SUBJECT_OF_EMAIL",
    text: `Name: ${user.fullName}
               Email: ${user.email}
               Brand Name: ${user.brandName}
               Website: ${user.website}
               ${user.achieve.desc} : ${user.achieve.value},
               ${user.services.desc}: ${user.services.value},
               ${user.budget.desc}: ${user.budget.value}`,

    attachments: [
      {
        filename: req.file.originalname,
        path: req.file.path,
      },
    ],
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(info);
      return res.status(500).send(error.toString());
    }
    res.status(200).send("Form submitted successfully!");
  });
});

module.exports = router;
