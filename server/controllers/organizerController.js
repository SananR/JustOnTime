import passport from 'passport';
import crypto from 'crypto';
import { EventOrganizer, OrganizerStatus } from '../models/eventOrganizerModel.js';
import { VerificationToken } from '../models/verificationTokenModel.js';
import { sendEmail } from '../util/mailerUtil.js';

const registerOrganizer = async (req, res, next) => {
    await passport.authenticate("registerOrganizer", 
    (err, user, info) => {
        if (err) { 
            if (err.message.includes("duplicate")){
                return res.status(400).send({
                    message: "The email is already used"
                  }) 
            }
            return res.status(400).send({
              message: err.message
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
              const host = 'http://localhost:3005';
              const subject = 'Account Verification Link';
              const text = 'Hello '+ req.body.firstName +',\n\n' + 'Please verify your account by clicking the link: ' 
              + host + '\/organizer\/verifyemail\/' + user.email + '\/' + token.token + '\n\nThank You!\n';
              sendEmail(user.email, subject, text, function (err) {
                if (err) { 
                    console.log(err);
                    return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
                }
                return res.status(200).send('A verification email has been sent to ' + user.email + 
                '. It will be expire after one day. If you did not get verification Email click on resend link.');
              });
            });
          });
    })(req, res, next);
}

const loginOrganizer = ((req, res, next) => {
  passport.authenticate("organizerLogin", function(err, user, info) {  
    if (err) { return next(err); }
    if (!user) { 
        return res.status(400).send({
            message: "email or password is incorrect"
        }); 
    }
    req.logIn(user, function(err) {
        if (err) { return next(err); }
        console.log("The user is " + req.user)
        return res.send(user);    
    });
})(req, res, next);
})

const verifyEmail = async (req, res, next) => {
  const foundToken = await VerificationToken.find();
  VerificationToken.findOne({token: req.params.token}, (err, token) => {
      if (!token){
          return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
      }
      else {
          EventOrganizer.findOne({ _id: token._userId, email: req.params.email}, (err, user) => {
              if (!user){
                  return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
              } 
              // user is already verified
              else if (user.ver){
                  return res.status(200).send('User has been already verified. Please Login');
              }
              // verify user
              else{
                  // change the verification status to SIGNUP_NOT_COMPLETE
                  user.verificationStatus = OrganizerStatus.VERIFICATION_IN_PROGRESS;
                  user.save(function (err) {
                      // error occur
                      if(err){
                          return res.status(500).send({msg: err.message});
                      }
                      // account successfully verified
                      else{
                        return res.status(200).send('Your account has been successfully verified');
                      }
                  });
              }
          })
      }
  })
}

const resendCode = async (req, res, next) => {
  EventOrganizer.findOne({ email: req.body.email }, async (err, user) => {
    if (!user){
        return res.status(400).send({msg: "We were unable to find an account with that email."})
    }
    else if (user.verificationStatus == OrganizerStatus.VERIFIED){
        return res.status(200).send({msg: "This account has already been verified."})
    }
    else if (user.verificationStatus == OrganizerStatus.SIGNUP_NOT_COMPLETE){
      return res.status(200).send({msg: "Sign up is not complete for this account. Please complete the signup process"})
    }
    else if (user.verificationStatus == OrganizerStatus.VERIFICATION_IN_PROGRESS){
      return res.status(200).send({msg: "This account is under review right now. Please give us 1-2 business days to verify your account"})
    }
    else {
        await VerificationToken.findOneAndDelete({_userId: user._id});
        var token = new VerificationToken({_userId: user._id, token: crypto.randomBytes(16).toString('hex')});
        token.save((err) => {
            if(err) {
                return res.status(500).send({msg:err.message});
            }
            
            const host = 'http://localhost:3005';
            const subject = 'Account Verification Link';
            const text = 'Hello '+ req.body.firstName +',\n\n' + 'Please verify your account by clicking the link: ' 
            + host + '\/organizer\/verifyemail\/' + user.email + '\/' + token.token + '\n\nThank You!\n';
            sendEmail(user.email, subject, text, function (err) {
              if (err) { 
                  console.log(err);
                  return res.status(500).send({msg:'Technical Issue!, Please click on resend for verify your Email.'});
              }
              return res.status(200).send('A new verification email has been sent to ' + user.email +
              '. It will be expire after one day.\n Please use the new verification link since the old link will be invalid.');
            });

        })
    }
  })
}


export { registerOrganizer, loginOrganizer, verifyEmail, resendCode }