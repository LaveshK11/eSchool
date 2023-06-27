/* This code is defining a function called `sendMail` that uses the `nodemailer` library to send an
email. The function takes an `options` object as a parameter, which contains the email address of
the recipient, the subject of the email, and the message body. The function creates a `transporter`
object using the SMTP credentials of a mail service provider (in this case, Mailtrap), and then uses
the `transporter` object to send the email using the `sendMail` method. The function also logs the
HTML content of the email to the console. Finally, the function is exported so that it can be used
in other parts of the codebase. */

const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: "",
    pass: "",
  },
});

const smtpClient = async (options) => {
  let info = await transporter.sendMail({
    from: "My School", // sender address
    to: options.email, // list of receivers
    subject: options.subject,
    html: `<p>${options.message}</p>`,
  });
  transporter.sendMail(info, (error, response) => {
    if (error) {
      console.log(error);
    } else {
      console.log("Mail sent successfully to ", options.email);
    }
  });
};

module.exports = { smtpClient };
