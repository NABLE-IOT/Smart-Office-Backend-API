import nodemailer from "nodemailer";
import { EmailTemplate } from "./EmailTemplate.js";

const generateOtp = () => {
  let OTP = "";
  for (let i = 0; i < 5; i++) {
    const randomValue = Math.round(Math.random() * 9);
    OTP += randomValue;
  }
  return OTP;
};

const mailTransport = async (email, OTP, userName) => {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    service: "gmail",
    port: 587,
    secure: false,
    auth: {
      user: process.env.MAILTRAP_USER_NAME,
      pass: process.env.MAILTRAP_PASSWORD,
    },
  });

  // send mail with defined transport object
  let info = await transporter
    .sendMail({
      from: process.env.MAILTRAP_USER_NAME,
      to: email,
      subject: "Your Temporary Password",
      html: EmailTemplate(OTP, userName),
    })
    .then((done) => {
      console.log(done);
    });
};

export { generateOtp, mailTransport };
