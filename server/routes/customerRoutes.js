import express from 'express';

import { registerCustomer, loginCustomer, verifyEmail, resendCode } from '../controllers/customerController.js';
import { validateUserRegisterSchema, validateUserLoginSchema } from "../util/validation/userValidationSchema.js";

const customerRouter = express.Router();

customerRouter.route("/").post(validateUserRegisterSchema, registerCustomer);
customerRouter.route("/").put(validateUserLoginSchema, loginCustomer);
customerRouter.route("/verifyemail/:email/:token").post(verifyEmail);
customerRouter.route("/resendcode").post(resendCode);

export { customerRouter }