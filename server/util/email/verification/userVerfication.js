import {VerificationToken} from "../../../models/verificationTokenModel.js";
import crypto from "crypto";
import {transporter} from "../nodeMailerTransporter.js";
import {clientError, serverError, success} from "../../http/httpResponse.js";

const host = 'http://localhost:3005'


const mailOptions = (user, token) => {
    return {
        from: process.env.EMAIL_ADDRESS,
        to: user.email,
        subject: 'Account Verification Link',
        text: 'Hello '+ user.firstName +',\n\n' + 'Please verify your account by clicking the link: '
            + host + '\/customer\/verifyemail\/' + user.email + '\/' + token.token + '\n\nThank You!\n'
    }
};

const createSaveToken = (res, user, successMessage) => {
    //generate token to verify email address
    const token = VerificationToken({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
    token.save().then(async () => {
        // Send email (use credentials of SendGrid)
        await transporter.sendMail(mailOptions(user, token), function (err) {
            if (err) {
                console.error(err);
                return serverError(res, err.message);
            }
            return success(res, successMessage, false);
        });
    }).catch(err => {
        console.error(err);
        return clientError(res, err.message);
    });
}

export { createSaveToken }