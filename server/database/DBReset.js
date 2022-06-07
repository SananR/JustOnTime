import mongoose from 'mongoose'
import { Customer } from '../models/customer.model.js'
import { EventOrganizer } from '../models/eventOrganizer.model.js'
import dotenv from 'dotenv';
dotenv.config();


async function removeAllData() {
    Customer.remove({}, () => {});
    EventOrganizer.remove({}, () => {});
}

export { removeAllData }