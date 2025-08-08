require("dotenv").config();
let nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

exports.sendEmail = (to, subject, message) => {
    let mailOption = {
        from: process.env.EMAIL_USER,  
        to,
        subject,
        text: message
    };
    return transporter.sendMail(mailOption);
};
