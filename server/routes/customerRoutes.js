import express from 'express';

import { registerCustomer, verifyEmail, resendCode } from '../controllers/customerController.js';

const customerRouter = express.Router();

customerRouter.route("/").post(registerCustomer);
customerRouter.route("/verifyemail/:email/:token").post(verifyEmail);
customerRouter.route("/resendcode").post(resendCode);

export { customerRouter }