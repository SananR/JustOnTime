import { router as loginRouter } from './login.js'
import { router as signupRouter } from './signup.js'

function setupCustomerRoutes(app) {
    app.use("/customer/login", loginRouter);
    app.use("/customer/signup", signupRouter);
}

export { setupCustomerRoutes } 