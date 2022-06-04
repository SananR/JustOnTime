//Created by Yuto, could be moved to server.js/index.js
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

import { setupCustomerRoutes } from './routes/customer/index.js';
import { setupOrganizerRoutes } from './routes/organizer/index.js';
import { demo } from './api/databse/DBDemo.js'

dotenv.config()

const app = express();

app.use(express.json());
app.use(cors());

// set up routes
setupCustomerRoutes(app);
setupOrganizerRoutes(app);

app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));
demo()

// Server listens on port3000
const hostname = 'localhost';
const port = process.env.PORT || 3000;
app.listen(port, ()=>{
    console.log('Server running at http://'+ hostname + ':' + port + '/');
})