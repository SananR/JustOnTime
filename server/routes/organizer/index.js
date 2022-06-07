import { router as loginRouter } from './login.js'
import { router as registerRouter } from './register.js'

function setupOrganizerRoutes(app) {
    app.use("/organizer/login", loginRouter);
    app.use("/organizer/register", registerRouter);
}

export { setupOrganizerRoutes }