import mongoose from 'mongoose'
import { addressSchema } from '../address.schema.js'


const eventStatusValidator = (status) => {
    if (status == "Completed" ||
        status == "Ongoing" || 
        status == "UnderReview" ||
        status == "Cancelled"){
            return true
        }
    return false
}

const eventInfoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    time: {
        type: Date,
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    },
    Status: {
        type: String,
        required: true,
        validator: [eventStatusValidator, "EventStatus is not valid"]
    }
});

export { eventInfoSchema }