import { router as loginRouter } from './login.js'
import { router as registerRouter } from './register.js'

function setupCustomerRoutes(app) {
    app.use("/customer/login", loginRouter);
    app.use("/customer/register", registerRouter);
}

export { setupCustomerRoutes } 

/*import express from "express";
import {registerUser} from "../../api/apiUser.js"
const router = express.Router();

router.route("/").post(registerUser);

export {router};*/