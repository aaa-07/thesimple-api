var express = require('express');
require('dotenv').config({ path: '../.env' })
const nodemailer = require('nodemailer');
var router = express.Router();
const multer = require('multer');
const UserModel = require('../model/User');


// Configure multer for file upload
const upload = multer({ dest: 'uploads/' });

router.post('/details', upload.single('file'), (req, res) => {

    const user = new UserModel({
        fullName: req.body.fullName,
        email: req.body.email,
        brandName: req.body.brandName,
        website: req.body.website,
        achieve: {
            desc: "What do you want to achieve?",
            value: req.body.achieve
        },
        services: {
            desc: "What services do you need?",
            value: req.body.services
        },
        budget: {
            desc: "Budget range",
            value: req.body.budget
        }
    })
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
        from: From_EMAIL_ID,
        to: `${user.email}`,
        subject: SUBJECT_OF_EMAIL,
        text: `Name: ${user.fullName}
               Email: ${user.email}
               Brand Name: ${user.brandName}
               Website: ${user.website}
               ${user.achieve.desc} : ${user.achieve.value.map(item => `${item}`).join(',')}
               ${user.services.desc}: ${user.services.value.map(item => `${item}`).join(',')}
               ${user.budget.desc}: ${user.budget.value.map(item => `${item}`).join(',')} `,

        attachments: [
            {
                filename: req.file.originalname,
                path: req.file.path
            }
        ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(info);
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Form submitted successfully!');
    });
});

module.exports = router;