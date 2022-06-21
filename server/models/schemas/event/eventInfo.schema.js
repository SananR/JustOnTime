import mongoose from 'mongoose'
import { addressSchema } from '../address.schema.js'


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
        required: false
    },
    status: {
        type: String,
        required: false,
        enum : ['Completed','Ongoing', 'UnderReview','Cancelled'],
        default: 'UnderReview'
    }
});

export { eventInfoSchema }