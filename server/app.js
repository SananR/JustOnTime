//Created by Yuto, could be moved to server.js/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import passport from 'passport';
import session from 'express-session';
import MongoDBStore from 'connect-mongodb-session';

import { configPassportStrategy } from './auth/index.js';
import { setupCustomerRoutes } from './routes/customer/index.js';
import { setupOrganizerRoutes } from './routes/organizer/index.js';
import { connectDB } from './api/databse/DBConnect.js'
import { removeAllData } from './api/databse/DBReset.js';

dotenv.config()

const app = express();

app.use(express.urlencoded({
    extended: true
}));
app.use(express.json({
    extended: true
}));
app.use(cors());

// configure session
var sessionStore = new MongoDBStore(session)({
    uri: 'mongodb://localhost:27017/connect_mongodb_session_test',
    collection: 'mySessions'
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
})

app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));

// Server listens on port3000
const hostname = 'localhost';
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('Server running at http://'+ hostname + ':' + port + '/');
})