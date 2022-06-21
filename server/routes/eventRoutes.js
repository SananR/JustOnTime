import express from 'express';

import { addEvent, uploadMiddleware } from '../controllers/eventController.js';

const eventRouter = express.Router();

eventRouter.route("/event").post(uploadMiddleware, addEvent);

export { eventRouter }