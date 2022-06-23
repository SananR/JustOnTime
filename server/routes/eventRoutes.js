import express from 'express';

import { addEvent, getEvents, getOrganizerEvents} from '../controllers/eventController.js';
import { eventImageService } from '../util/multer.js';
import { checkAuthentication } from '../util/passport/authentication.js';
import { validateEventCreationSchema } from '../util/validation/eventValidationSchema.js';

const eventRouter = express.Router();

eventRouter.route("/").post( checkAuthentication(['Organizer']),eventImageService.uploadImage, validateEventCreationSchema, addEvent);
eventRouter.route("/").get( checkAuthentication([]),getEvents);
eventRouter.route("/organizerEvents").get( checkAuthentication([]),getOrganizerEvents);

export { eventRouter }