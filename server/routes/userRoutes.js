import express from 'express';

import { registerCustomer, loginCustomer, verifyEmail, resendCode } from '../controllers/customerController.js';
import { validateUserRegisterSchema, validateUserLoginSchema } from "../util/validation/userValidationSchema.js";

const userRouter = express.Router();

userRouter.route("/register").post(validateUserRegisterSchema, registerCustomer);
userRouter.route("/login").post(validateUserLoginSchema, loginCustomer);
userRouter.route("/verifyemail/:email/:token").post(verifyEmail);
userRouter.route("/resendcode").post(resendCode);

export { userRouter }