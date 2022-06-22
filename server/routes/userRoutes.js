import express from 'express';

import { registerUser, loginUser, verifyEmail, resendCode, updateInformation} from '../controllers/userController.js';
import { validateUserRegisterSchema, validateUserLoginSchema } from "../util/validation/userValidationSchema.js";
import { checkAuthentication } from "../util/passport/authentication.js"

const userRouter = express.Router();

userRouter.route("/register").post(validateUserRegisterSchema, registerUser);
userRouter.route("/login").post(validateUserLoginSchema, loginUser);
userRouter.route("/verifyemail/:email/:token").post(verifyEmail);
userRouter.route("/resendcode").post(resendCode);
userRouter.route("/personal-info").post(checkAuthentication([]), updateInformation); 

export { userRouter }