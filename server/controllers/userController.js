import passport from 'passport';
import { User } from '../models/userModel.js';
import { VerificationToken } from '../models/verificationTokenModel.js';
import { flagError, clientError, serverError, success } from "../util/http/httpResponse.js";
import { createSaveToken } from "../util/email/verification/userVerification.js";
import { validationResult } from 'express-validator';
import { checkAuthentication } from "../util/passport/authentication.js"

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return clientError(res, errors.array());
    }
    await passport.authenticate("registerUser", {},
    (err, user, info) => {
        if (err) {
            const duplicate = flagError(res, err.message, "duplicate",  400,"There is already an account with the specified email.")
            if (duplicate) return duplicate;
            else return clientError(res, err.message);
        }
          if (!user) return clientError(res, info.message);
          req.logIn(user, function(err) {
            if (err) return next(err);
            //Create verification token
            return createSaveToken(res, user, "");
          });
    })(req, res, next);
}

const loginUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return clientError(res, errors.array());
    }
  passport.authenticate("loginUser", {},function(err, user, info) {
    if (err) return next(err);
    if (!user) return clientError(res, "Invalid credentials.");
    else req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.send(user);    
    });
  })(req, res, next);
}

const verifyEmail = async (req, res, next) => {
  const foundToken = await VerificationToken.find();
  VerificationToken.findOne({token: req.params.token}, (err, token) => {
      if (err) {
        console.error(err);
        return serverError(res, err.message);
      }
      if (!token) return clientError(res, "Your verification link has expired. Please click on resend to receive a new link for verification.");
      else {
          User.findOne({ _id: token._userId}, (err, user) => {
              if (!user)
                  return clientError(res, 'We were unable to find a user for this verification.');
              // user is already verified
              else if (user.isVerified)
                  return clientError(res, 'User has already been already verified');
              // verify user
              else {
                  // change isVerified to true
                  user.isVerified = true;
                  user.save(function (err) {
                      // error occur
                      if (err) return serverError(res, err.message);
                      // account successfully verified
                      else return success(res, "Account has been successfully verified.", true);
                  });
              }
          })
      }
  })
}

const resendCode = async (req, res, next) => {
  User.findOne({ userInfo: { email: req.body.email } }, async (err, user) => {
    if (!user) return clientError(res, "We were unable to find an account with that email.");
    else if (user.isVerified)
        return clientError(res, "This account has already been verified.");
    else {
        await VerificationToken.findOneAndDelete({_userId: user._id});
        return createSaveToken(res, user, 'A new verification email has been sent, the old one is now invalid.');
    }
  })
}


// request body {"update": {{userInfo.field: newValue},{organizer.field: newValue}} , filter: {"userInfo.email": email}}
//cannot update email or password with this
const updateInformation = async (req, res, next) => {
    const filter = req.body.filter
    const update = req.body.update; 
    User.findOneAndUpdate(filter, update, {new: true},  async (err, user) => {
      console.log(user); 
      if (!user) return clientError(res, "Unable to update the field at this time. Please try again later. ");
      else return success(res, user, false);
    }); 
   
  }

export { registerUser, loginUser, verifyEmail, resendCode, updateInformation, add}

