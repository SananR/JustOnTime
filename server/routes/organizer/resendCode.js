import express from 'express';
import nodemailer from 'nodemailer';
import crypto from 'crypto';
import { EventOrganizer } from '../../models/eventOrganizer.model.js';
import { VerificationToken } from '../../models/verificationToken.model.js';
const router = express.Router();

router
    .route("/organizer/resendcode")
    .post(async (req, res, next) => {
        EventOrganizer.findOne({ email: req.body.email }, async (err, user) => {
            if (!user){
                return res.status(400).send({msg: "We were unable to find an account with that email."})
            }
            else if (user.isVerified){
                return res.status(200).send({msg: "This account has already been verified."})
            }
            else {
                await VerificationToken.findOneAndDelete({_userId: user._id});
                var token = new VerificationToken({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
                token.save((err) => {
                    if(err) {
                        return res.status(500).send({msg:err.message});
                    }
                    const transporter = nodemailer.createTransport({ 
                        host: "smtp.mail.yahoo.com", 
                        port: 465,
                        service: "yahoo",
                        secure: false,
                        auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_APP_PASS },
                        logger: true
                      });
                    //   console.log(VerificationToken.find());
                    const mailOptions = { 
                    from: process.env.EMAIL_ADDRESS, 
                    to: user.contact.email, 
                    subject: 'Account Verification Link', 
                    text: 'Hello '+ req.body.firstName +',\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/'
                        + req.headers.host + '\/organizer\/verifyemail\/' + user.contact.email + '\/' + token.token + '\n\nThank You!\n' 
                    };
                    transporter.sendMail(mailOptions, function (err) {
                    if (err) { 
                        console.log(err);
                        return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                    }
                    return res.status(200).send('A verification email has been sent to ' + user.contact.email + '. It will be expire after one day. If you not get verification Email click on resend token.');
                    });
                })
            }
        })
        
    })


export { router }
