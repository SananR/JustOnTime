import {VerificationToken} from "../../../models/verificationTokenModel.js";
import crypto from "crypto";
import { clientError, serverError, successWithData } from "../../http/httpResponse.js";
import nodemailer from "nodemailer";

const host = 'http://localhost:3005'
function transporter() {
    return nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 465,
        secure: false,
        auth: {user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_PASS},
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
                return serverError(res, err.message);
            }
            return successWithData(res, data, false);
        });
    }).catch(err => {
        console.error(err);
        return clientError(res, err.message);
    });
}


function resetOptions(email, token, field) {
    return {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: field +' Reset Link',
        text: 'You requested to change your ' + field.toLowerCase() +'\n\n' + 'Please, click the link below to change your ' + field.toLowerCase()
      + ":"  + '\n\n'  + host +'\/reset' + field.toLowerCase() + '\/' + token.token + '\/' + token._userId +  '\n\nThank You!\n'
    }
}
function createResetToken(res, user, data, field) {
    //generate token to verify email address
    let trans = transporter();
    const token = VerificationToken({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
    token.save().then(async () => {
        // Send email (use credentials of SendGrid)
        await trans.sendMail(resetOptions(user.userInfo.email, token, field), function (err) {
            if (err) {
                console.error(err);
                return serverError(res, err.message);
            }
            return successWithData(res, data, false);
        });
    }).catch(err => {
        console.error(err);
        return clientError(res, err.message);
    });
}

async function emailer(res, email, subject, message){
    const options = {
        from: process.env.EMAIL_ADDRESS,
        to: email,
        subject: subject,
        text: message
    }
    let trans = transporter();
    await trans.sendMail(options, function (err) {
        if (err) {
            console.error(err);
            return serverError(res, err.message);
        }
        return successWithData(res, options, false);
    });

}

export { createSaveToken, createResetToken, emailer}