import { router as loginRouter } from './login.js'

function setupCustomerRoutes(app) {
    app.use("/customer/login", loginRouter);
}

export { setupCustomerRoutes } 