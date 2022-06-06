import express from 'express';
import cors from 'cors';
import passport from 'passport';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';

import { configPassportStrategy } from './auth/index.js';
import { setupCustomerRoutes } from './routes/customer/index.js';
import { setupOrganizerRoutes } from './routes/organizer/index.js';
import { connectDB } from './api/databse/DBConnect.js'
import { removeAllData } from './api/databse/DBReset.js';

const app = express();

app.use(express.urlencoded());
app.use(express.json());
app.use(cors());

// configure session
var sessionStore = new MongoDBStore(session)({
    uri: process.env.SESSION_DB_URI,
    collection: process.env.SESSION_DB_COLLECTION
  });
// Catch errors
sessionStore.on('error', function(error) {
    console.log(error);
  });
app.use(session({
    secret: process.env.SESSION_SECCRET_KEY,
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

// connect to DB 
// (it is deleting data everytime we start server for testing)
connectDB().then(() => {
    removeAllData();
})

app.get("/userInSession", (req,res) => {
    console.log(req.user);
    res.send(req.user);
});
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));

export default app;