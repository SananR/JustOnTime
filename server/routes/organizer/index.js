import { router as loginRouter } from './login.js'


function setupOrganizerRoutes(app) {
    app.use("/organizer/login", loginRouter);
}

export { setupOrganizerRoutes } 