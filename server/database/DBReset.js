import mongoose from 'mongoose'
import { Customer } from '../api/models/customer.model.js'
import { EventOrganizer } from '../api/models/eventOrganizer.model.js'
import dotenv from 'dotenv';
dotenv.config();


async function removeAllData() {
    Customer.remove({}, () => {});
    EventOrganizer.remove({}, () => {});
}

export { removeAllData }