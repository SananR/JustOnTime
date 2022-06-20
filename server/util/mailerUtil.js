import nodemailer from 'nodemailer';


const sendEmail = (email, subject, text, callback) => {
    const transporter = nodemailer.createTransport({ 
        host: "smtp.mail.yahoo.com", 
        port: 465,
        service: "yahoo",
        secure: false,
        auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_APP_PASS },
        logger: true
    });
    
    const mailOptions = { 
    from: process.env.EMAIL_ADDRESS, 
    to: email, 
    subject: subject,
    text: text 
    };
    
    transporter.sendMail(mailOptions, function (err) {
        if (err) { 
            console.log(err);
            return callback(err)
        }
        return callback(null)
    });
}



export { sendEmail }