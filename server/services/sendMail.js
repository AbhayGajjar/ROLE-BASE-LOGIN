const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  secure: false, // true for port 465, false for other ports
  auth: {
    user: "abhaymgajjar@gmail.com",
    pass: "rhpqkmkgsbnovuxm",
  },
});

// async..await is not allowed in global scope, must use a wrapper
async function sendMail(to, subject, text, html) {
  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: "abhaymgajjar@gmail.com", // sender address
    to,
    subject,
    text,
    html,
  });
}

module.exports = { sendMail };
