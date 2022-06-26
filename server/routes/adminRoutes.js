import express from 'express';

import { getUnverifiedOrganizers, updateOrganizerStatus, getUnverifiedEvents } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.route("/getUnverifiedOrganizers").get(getUnverifiedOrganizers);
adminRouter.route("/updateOrganizerStatus").post(updateOrganizerStatus);
adminRouter.route("/getUnverifiedEvents").get(getUnverifiedEvents);

export { adminRouter }