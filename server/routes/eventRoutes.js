import express from 'express';

import { addEvent, getEvents, getAnEvent, getOrganizerEvents, updateEvents, getEventImage } from '../controllers/eventController.js';
import { eventImageService } from '../util/ImageService.js';
import { checkAuthentication} from '../util/passport/authentication.js';
import { validateEventCreationSchema } from '../util/validation/eventValidationSchema.js';

const eventRouter = express.Router();

eventRouter.route("/").post( checkAuthentication(['Organizer']), eventImageService.uploadImage, validateEventCreationSchema, addEvent);
eventRouter.route("/").get(getEvents);
eventRouter.route("/getImage").get(getEventImage);
eventRouter.route("/getAnEvent").get(getAnEvent);
eventRouter.route("/organizerEvents").get( checkAuthentication([]),getOrganizerEvents);
eventRouter.route("/updateEvent").post(checkAuthentication(['Organizer']), eventImageService.uploadImage, validateEventCreationSchema, updateEvents);

export { eventRouter }