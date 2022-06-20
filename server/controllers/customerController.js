import passport from 'passport';
import { Customer } from '../models/customerModel.js';
import { VerificationToken } from '../models/verificationTokenModel.js';
import { flagError, clientError, serverError, success } from "../util/http/httpResponse.js";
import { createSaveToken } from "../util/email/verification/userVerfication.js";

const registerCustomer = async (req, res, next) => {
    await passport.authenticate("registerCustomer", {},
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

const loginCustomer = async (req, res, next) => {
  passport.authenticate("customerLogin", {},function(err, user, info) {
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
          Customer.findOne({ _id: token._userId, email: req.params.email}, (err, user) => {
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
  Customer.findOne({ email: req.body.email }, async (err, user) => {
    if (!user) return clientError(res, "We were unable to find an account with that email.");
    else if (user.isVerified)
        return clientError(res, "This account has already been verified.");
    else {
        await VerificationToken.findOneAndDelete({_userId: user._id});
        return createSaveToken(res, user, 'A new verification email has been sent, the old one is now invalid.');
    }
  })
}

export { registerCustomer, loginCustomer, verifyEmail, resendCode }

