import express from 'express';

import { registerUser, loginUser, logoutUser, verifyEmail, resendCode, registerOrganizer, updateInformation } from '../controllers/userController.js';
import { checkAuthentication } from '../util/passport/authentication.js';
import { validateUserRegisterSchema, validateUserLoginSchema,validateOrganizerRegisterSchema } from "../util/validation/userValidationSchema.js";

const userRouter = express.Router();

userRouter.route("/register").post(validateUserRegisterSchema, registerUser);
userRouter.route("/login").post(validateUserLoginSchema, loginUser);
userRouter.route("/logout").delete(checkAuthentication([]), logoutUser);
userRouter.route("/verifyemail/:email/:token").post(verifyEmail);
userRouter.route("/resendcode").post(resendCode);
userRouter.route("/personal-info").post(checkAuthentication([]), updateInformation); 
userRouter.route("/registerOrganizer").post(checkAuthentication(['Customer']),validateOrganizerRegisterSchema,registerOrganizer)

export { userRouter }