import { router as loginRouter } from './login.js'


function setupCustomerRoutes(app) {
    app.use("/login", loginRouter);
}

export { setupCustomerRoutes } 