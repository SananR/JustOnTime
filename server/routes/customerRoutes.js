import express from 'express';

import { registerCustomer } from '../controllers/customerController.js';

const customerRouter = express.Router();

customerRouter.route("/").post(registerCustomer);

export { customerRouter }