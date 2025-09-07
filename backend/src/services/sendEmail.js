require("dotenv").config();
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // App Password if 2FA enabled
    }
});

// Export sendEmail function
// Make sure the third parameter is named and used correctly
exports.sendEmail = async (to, subject,message, htmlContent) => {
    if (!htmlContent) htmlContent = ""; // fallback

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
         text: message,
        html: htmlContent // ✅ use the parameter
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log("✅ Email sent:", info.response);
        return info;
    } catch (err) {
        console.error("❌ Error sending email:", err);
        throw err;
    }
};
