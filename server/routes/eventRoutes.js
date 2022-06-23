import express from 'express';

import { addEvent, getEvents, getOrganizerEvents} from '../controllers/eventController.js';
import { eventImageService } from '../util/multer.js';
import { checkAuthentication,checkAuthentication_id } from '../util/passport/authentication.js';
import { validateEventCreationSchema } from '../util/validation/eventValidationSchema.js';

const eventRouter = express.Router();

eventRouter.route("/").post( checkAuthentication_id(['Organizer']),eventImageService.uploadImage, validateEventCreationSchema, addEvent);
eventRouter.route("/").get( checkAuthentication_id([]),getEvents);
eventRouter.route("/organizerEvents").get( checkAuthentication_id([]),getOrganizerEvents);

export { eventRouter }