import { router as loginRouter } from './login.js'
import { router as registerRouter } from './register.js'
import { router as verifyEmailRouter } from './verifyEmail.js'

function setupOrganizerRoutes(app) {
    app.use("/organizer/login", loginRouter);
    app.use("/organizer/register", registerRouter);
    app.use(verifyEmailRouter);
}

export { setupOrganizerRoutes } 