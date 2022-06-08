import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import dotenv from 'dotenv';

import { configPassportStrategy } from './auth/index.js';
import { setupCustomerRoutes } from './routes/customer/index.js';
import { setupOrganizerRoutes } from './routes/organizer/index.js';

dotenv.config();

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

// configure session
var sessionStore = new MongoDBStore(session)({
    uri: process.env.JUSTONTIME_DB_URI_LOCAL, //process.env.JUSTONTIME_DB_URI (use this on production)
    collection: process.env.JUSTONTIME_DB
  });
// Catch errors
sessionStore.on('error', function(error) {
    console.log(error);
  });
app.use(session({
    secret: process.env.SESSION_SECRET_KEY,
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}))

// configure passport strategy
configPassportStrategy(passport);
app.use(passport.initialize());
app.use(passport.session());

// set up routes
setupCustomerRoutes(app);
setupOrganizerRoutes(app);


app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));

export default app;