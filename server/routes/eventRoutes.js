import express from 'express';

import { addEvent} from '../controllers/eventController.js';
import { uploadImage } from '../util/gridFs.js';
import { checkAuthentication } from '../util/passport/authentication.js';
import { validateEventCreationSchema } from '../util/validation/eventValidationSchema.js';

const eventRouter = express.Router();

eventRouter.route("/").post( checkAuthentication(['Organizer']),uploadImage, validateEventCreationSchema, addEvent);

export { eventRouter }