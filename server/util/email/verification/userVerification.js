import {VerificationToken} from "../../../models/verificationTokenModel.js";
import crypto from "crypto";
import { clientError, serverError, successWithData } from "../../http/httpResponse.js";
import nodemailer from "nodemailer";

const host = 'http://localhost:3005'

function transporter() {
    return nodemailer.createTransport({
        host: "smtp.mail.yahoo.com",
        port: 465,
        service: "yahoo",
        secure: false,
        auth: {user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_APP_PASS},
        logger: true
    });
}
function mailOptions(user, token) {
    return {
        from: process.env.EMAIL_ADDRESS,
        to: user.userInfo.email,
        subject: 'Account Verification Link',
        text: 'Hello '+ user.userInfo.firstName +',\n\n' + 'Please verify your account by clicking the link: '
            + host + '\/user\/verifyemail\/' + user.userInfo.email + '\/' + token.token + '\n\nThank You!\n'
    }
}

function createSaveToken(res, user, data) {
    //generate token to verify email address
    let trans = transporter();
    const token = VerificationToken({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
    token.save().then(async () => {
        // Send email (use credentials of SendGrid)
        await trans.sendMail(mailOptions(user, token), function (err) {
            if (err) {
                console.error(err);
                return 
            }
            return
        });
    }).catch(err => {
        console.error(err);
        return 
    });
}

export { createSaveToken }