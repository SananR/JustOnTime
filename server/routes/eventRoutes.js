import express from 'express';

import { addEvent} from '../controllers/eventController.js';
import { uploadImage } from '../util/gridFs.js';
import { validateEventCreationSchema } from '../util/validation/eventValidationSchema.js';

const eventRouter = express.Router();

eventRouter.route("/").post( uploadImage, validateEventCreationSchema, addEvent);

export { eventRouter }