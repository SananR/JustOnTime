import express from 'express';

import { addEvent, getEvents, getOrganizerEvents, updateEvents, getEventImage, updateBids } from '../controllers/eventController.js';
import { eventImageService } from '../util/ImageService.js';
import { checkAuthentication} from '../util/passport/authentication.js';
import { validateEventCreationSchema } from '../util/validation/eventValidationSchema.js';

const eventRouter = express.Router();

eventRouter.route("/").post( checkAuthentication(['Organizer']), eventImageService.uploadImage, validateEventCreationSchema, addEvent);
eventRouter.route("/").get(getEvents);
eventRouter.route("/getImage").get(getEventImage);
eventRouter.route("/organizerEvents").get( checkAuthentication([]),getOrganizerEvents);
eventRouter.route("/updateEvent").post(checkAuthentication(['Organizer']), eventImageService.uploadImage, validateEventCreationSchema, updateEvents);
eventRouter.route("/updateBids").post(updateBids)

export { eventRouter }