import express from 'express';

import { getUnverifiedEvents } from '../controllers/adminController.js';

const adminRouter = express.Router();

adminRouter.route("/getUnverifiedOrganizers").get(getUnverifiedEvents);

export { adminRouter }