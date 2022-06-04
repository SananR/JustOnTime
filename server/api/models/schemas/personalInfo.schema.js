import mongoose from 'mongoose'
import { addressSchema } from './address.schema.js'

const personalInfoSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },    
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: addressSchema,
        required: true
    }
});

export { personalInfoSchema }