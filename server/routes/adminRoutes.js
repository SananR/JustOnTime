import express from 'express';

import { getUnverifiedOrganizers, updateOrganizerStatus, getUnverifiedEvents, updateEventStatus } from '../controllers/adminController.js';
import { checkAuthentication} from '../util/passport/authentication.js';

const adminRouter = express.Router();

adminRouter.route("/getUnverifiedOrganizers").get(checkAuthentication(['Admin']) ,getUnverifiedOrganizers);
adminRouter.route("/updateOrganizerStatus").post(checkAuthentication(['Admin']), updateOrganizerStatus);
adminRouter.route("/getUnverifiedEvents").get(checkAuthentication(['Admin']), getUnverifiedEvents);
adminRouter.route("/updateEventStatus").post(checkAuthentication(['Admin']), updateEventStatus);

export { adminRouter }