import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    host: "smtp.mail.yahoo.com",
    port: 465,
    service: "yahoo",
    secure: false,
    auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_APP_PASS },
    logger: true
});

export { transporter }