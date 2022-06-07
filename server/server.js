import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import passport from 'passport'
import session from 'express-session'
import MongoDBStore from 'connect-mongodb-session'

import { configPassportStrategy } from './auth/index.js'
import { setupCustomerRoutes } from './routes/customer/index.js'
import { setupOrganizerRoutes } from './routes/organizer/index.js'
import { connectDB } from './database/DBconnect.js'
import { removeAllData } from './database/DBReset.js'
//import connectdB from "./config/dbconnect.js"

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

// connects to mongo db atlas online  cluster
//connectdB();

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