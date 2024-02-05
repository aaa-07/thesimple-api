var express = require('express');
require('dotenv').config({ path: '../.env' })
const nodemailer = require('nodemailer');
var router = express.Router();


router.post('/email', (req, res) => {
    // Configure Nodemailer with your email service credentials
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER_GMAIL,
            pass: process.env.USER_PASS,
        },
    });
    // Email configuration
    const mailOptions = {
        from: 'ajaykumarsh022@gmail.com',
        to: 'ajaykumarsh022@gmail.com',
        subject: 'Form Submission',
        // text: `Name: ${user.firstName}\nEmail: ${user.email}\nMessage: ${user.message}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Form submitted successfully!');
    });
});

module.exports = router;