import express from 'express';
import passport from 'passport';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { VerificationToken } from '../../models/verificationToken.model.js';
const router = express.Router();

router
    .route("/")
    .post((req, res, next) => {
        passport.authenticate("registerOrganizer", 
        (err, user, info) => {
            if (err) { 
                if (err.code = 11000){
                    return res.status(400).send({
                        message: "The email is already used"
                      }) 
                }
                return res.status(400).send({
                  message: err
                })
              }
              if (!user) {
                return res.send({
                  message: info.message
                }); 
              }
              console.log("We are logging in now!")
              req.logIn(user, function(err) {
                if (err) { return next(err); }
                console.log("We are logged in!")
                //generate token to verify email address
                var token = VerificationToken({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
                token.save()
                .then(async () => {
                  // Send email (use credintials of SendGrid)
                  console.log("Sending email")
                  const transporter = nodemailer.createTransport({ 
                    host: "smtp.mail.yahoo.com", 
                    port: 465,
                    service: "yahoo",
                    secure: false,
                    auth: { user: process.env.EMAIL_ADDRESS, pass: process.env.EMAIL_APP_PASS },
                    logger: true
                  });
                  console.log("your email: "+user.contact.email)
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
              });
        })(req, res, next);
    })
    
export { router }