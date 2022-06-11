import express from 'express'

import { registerOrganizer, loginOrganizer, verifyEmail, resendCode } from '../controllers/organizerController.js';

const organizerRouter = express.Router();

organizerRouter.route("/").post(registerOrganizer);
organizerRouter.route("/").put(loginOrganizer);
organizerRouter.route("/verifyemail/:email/:token").post(verifyEmail);
organizerRouter.route("/resendcode").post(resendCode);

export { organizerRouter }