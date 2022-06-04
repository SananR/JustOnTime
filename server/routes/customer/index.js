import { router as loginRouter } from './login.js'
import {router as signupRouter } from './signup.js'

function setupCustomerRoutes(app) {
    app.use("/login", loginRouter);
    app.use("/signup", signupRouter);
}

export { setupCustomerRoutes } 