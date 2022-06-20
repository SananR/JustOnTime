import express from 'express';

import { getUnverifiedOrganizers, updateOrganizerStatus } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.route("/getUnverifiedOrganizers").get(getUnverifiedOrganizers);
adminRouter.route("/updateOrganizerStatus").post(updateOrganizerStatus);

export { adminRouter }