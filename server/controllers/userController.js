import passport from 'passport';
import { User } from '../models/userModel.js';
import { VerificationToken } from '../models/verificationTokenModel.js';
import { flagError, clientError, serverError, success, successWithData } from "../util/http/httpResponse.js";
import { createSaveToken, createResetToken, emailer} from "../util/email/verification/userVerification.js";
import { validationResult } from 'express-validator';
import * as bcrypt from 'bcrypt';

const registerUser = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return clientError(res, errors.array());
    }
    await passport.authenticate("registerUser", {},
    (err, user, info) => {
        if (err) {
            const duplicate = flagError(res, err.message, "duplicate", 400, "There is already an account with the specified email.")
            if (duplicate) return duplicate;
            else return clientError(res, err.message);
        }
          if (!user) return clientError(res, info.message);
          req.logIn(user, function(err) {
            if (err) return next(err);
            //Create verification token
            return successWithData(res, user, false)
            return createSaveToken(res, user, user);
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
        return successWithData(res, user, false);
    });
  })(req, res, next);
}

const logoutUser = async (req, res, next) => {
    try {
        req.logout();
        return success(res, "", false);
    } catch (err) {
        console.error(err);
    }
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


// request body {"update": {{userInfo.field: newValue},{organizer.field: newValue}} , id: id}
//cannot update password with this
const updateInformation = async (req, res, next) => {
    const id = req.body.id
    const update = req.body.update; 
    if(JSON.stringify(req.body.update).indexOf("organizer") != -1){

      inprogress(id).then(() => {
        User.findByIdAndUpdate(id, update, {new: true},  async (err, user) => {
          console.log(user); 
          if (!user) return clientError(res, "Unable to update the field at this time. Please try again later. ");
          else return success(res, user, false);
        }); }
      ).catch(() => clientError(res, "Unable to update the field at this time. Please try again later. "));
    } else {
      User.findByIdAndUpdate(id, update, {new: true},  async (err, user) => {
        console.log(user); 
        if (!user) return clientError(res, "Unable to update the field at this time. Please try again later. ");
        else return success(res, user, false);
      });
    }
   
  }

const inprogress = async (id) => {
  User.findByIdAndUpdate(id, {"organizer.info.verificationStatus": "VERIFICATION_IN_PROGRESS"}, {new: true},  async (err, user) => {
    console.log(!user); 
    if (!user) return false;
    else return true;
  }); 
} 

const registerOrganizer = async (req, res, next) => {
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return clientError(res, errors.array());
  }
  else {
    const update = {
      organizer: {
          info: {
              phoneNumber : req.body.phoneNumber,
              address: req.body.address,
              businessName: req.body.businessName,
              businessLicense: req.body.businessLicense,
              postal: req.body.postal,
              city: req.body.city,
              province: req.body.province,
              verificationStatus: "VERIFICATION_IN_PROGRESS"
          },
      },
      "userType":"Organizer",
    }
    User.findByIdAndUpdate(req.body.id, update,{new: true}, (err, user) => {
        if (!user) {return clientError(res, "No such user exists");}
        if (err) {return clientError(res, "An unexpected error occurred");}
        return successWithData(res, user, false);
    });
  }
}

//body example {"email": user@email.com, "field": passsword}
const sendResetLink = async (req, res, next) => {
  User.findOne({ "userInfo.email" : req.body.email }, async (err, user) => {
    if (!user) return clientError(res, "We were unable to find an account with that email.");
    else {
      let token = await VerificationToken.findOne({ _userId: user._id });
      if (token) await VerificationToken.deleteOne(); 
      return createResetToken(res, user, 'A reset link has been sent to your inbox.', req.body.field);
    }
  })
}

//body example {"token": token}
const checkTokenExpiration = async (req, res, next) => {
  const passwordResetToken = await VerificationToken.findOne({token: req.body.token});
  console.log(passwordResetToken);
  if (!passwordResetToken) return clientError(res, "Token does not exist. Please try again.");
  else return success(res, "Token exists", false);

}

//example body: {id: id, password: password}
const passwordChanger = async (req, res, next) => {
  const hashed = await bcrypt.hash(req.body.password, 10); 
  if(!hashed) return clientError(res, "password could not be hashed.");
  else {
    const id = req.body.id
    const update = { "userInfo.password" : hashed }
    await VerificationToken.deleteOne({"_userId": req.body.id});
    User.findByIdAndUpdate(id, update, {new: true},  async (err, user) => {
    console.log(user); 
    if (!user) return clientError(res, "Unable to update the field at this time. Please try again later. ");
    else return successWithData(res, user, false);
  }); }
}
//example body : {message: email message, subject: subject of email, id: id}
const sendEmail = async (req, res, next) => {
  User.findOne({ "_id" : req.body.id }, async (err, user) => {
    if(!user) return clientError(res, "Couldn't send confirmation email")
    else {
      return await emailer(res, user.userInfo.email, req.body.subject, req.body.message)
    }
  });
}

//example body : {userId: user id, eventId: event id}
const updateStarredList = async (req, res, next) => {
  const userId = req.body.userId
  const eventId = req.body.eventId; 
  User.findOne({ "_id" : userId }, async (err, user) => {
    if (!user) return clientError(res, "We were unable to find the user.");
    else {
      if (!user.starredEvents.includes(eventId)) {
        User.findByIdAndUpdate(userId, {$push: {"starredEvents": eventId}}, {new: true},  async (err, user) => {
          console.log(user); 
          if (!user) return clientError(res, "Unable to update the field at this time. Please try again later. ");
          else return success(res, user, false);
        });
      } else {
        User.findByIdAndUpdate(userId, {$pull: {"starredEvents": eventId}}, {new: true},  async (err, user) => {
          console.log(user); 
          if (!user) return clientError(res, "Unable to update the field at this time. Please try again later. ");
          else return success(res, user, false);
        });
      }
    }
  })
}


export { registerUser, loginUser, logoutUser, verifyEmail, resendCode, registerOrganizer, updateInformation, sendResetLink, checkTokenExpiration, passwordChanger, sendEmail, updateStarredList}

