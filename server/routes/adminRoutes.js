import express from 'express';

import { getUnverifiedOrganizers, updateOrganizerStatus, getUnverifiedEvents, updateEventStatus } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.route("/getUnverifiedOrganizers").get(getUnverifiedOrganizers);
adminRouter.route("/updateOrganizerStatus").post(updateOrganizerStatus);
adminRouter.route("/getUnverifiedEvents").get(getUnverifiedEvents);
adminRouter.route("/updateEventStatus").post(updateEventStatus);

export { adminRouter }