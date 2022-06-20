import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';
import dotenv from 'dotenv';
import bodyParser from "body-parser";

import { configPassportStrategies, configPassportSerialization } from './auth/passportController.js';
import { organizerRouter } from './routes/organizerRoutes.js';
import { customerRouter } from './routes/customerRoutes.js';
import { adminRouter } from './routes/adminRoutes.js';

dotenv.config();

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
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

// configure passport
configPassportStrategies(passport);
configPassportSerialization(passport);
app.use(passport.initialize(undefined));
app.use(passport.session(undefined));

app.use("/api/organizer", organizerRouter);
app.use("/api/customer", customerRouter);
app.use("/api/admin", adminRouter);
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));

export default app;