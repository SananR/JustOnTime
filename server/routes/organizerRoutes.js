import express from 'express'

import { registerOrganizer } from '../controllers/organizerController.js';

const organizerRouter = express.Router();

organizerRouter.route("/").post(registerOrganizer);

export { organizerRouter }