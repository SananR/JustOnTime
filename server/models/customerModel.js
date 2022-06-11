import mongoose from 'mongoose'
import { contactSchema } from './schemas/contact.schema.js'
import { personalInfoSchema } from './schemas/personalInfo.schema.js';

const customerSchema = mongoose.Schema({
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
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
},  {
    timestamps: true,
});

const Customer = mongoose.model("Customer", customerSchema);

export { Customer }