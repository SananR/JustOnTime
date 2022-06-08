import mongoose from 'mongoose'
import { Customer } from '../models/customer.model.js'; 
import { EventOrganizer } from '../models/eventOrganizer.model.js';
import { Event } from '../models/event.model.js';
import dotenv from 'dotenv';
dotenv.config();


async function connectDB() {
    var uri = process.env.JUSTONTIME_DB_URI_LOCAL; //process.env.JUSTONTIME_DB_URI (use this on production)
    await mongoose.connect(uri);
    await Customer.remove({}, ()=>{console.log("Customers deelted")});
    await EventOrganizer.remove({}, ()=>{console.log("EventOrganizers deelted")});
}

export { connectDB }