const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  // 1. Create the Transporter (Connect to Google)
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER, // Your Gmail address
      pass: process.env.EMAIL_PASS, // Your Google App Password
    },
  });

  // 2. Define Email Options
  const mailOptions = {
    from: `"UI Campus Navigator" <${process.env.EMAIL_USER}>`,
    to: options.email,
    subject: options.subject,
    html: options.message, // We use HTML for better looking emails
  };

  // 3. Send the Email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;