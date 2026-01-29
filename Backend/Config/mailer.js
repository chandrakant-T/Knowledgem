// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.EMAIL_PASS,
//   },
//   connectionTimeout: 10000, 
//   greetingTimeout: 10000,
//   socketTimeout: 10000,
// });

// module.exports = transporter;

const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // Use 465 for SSL - much more stable on Render
  secure: true, 
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS, // 16-character App Password
  },
  // These settings are CRITICAL to stop the 500 error hang
  connectionTimeout: 20000, // Give it 20 seconds
  greetingTimeout: 20000,
  socketTimeout: 20000,
});

module.exports = transporter;





