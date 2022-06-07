import mongoose from 'mongoose'
import { contactSchema } from './schemas/contact.schema.js'
import { personalInfoSchema } from './schemas/personalInfo.schema.js';

const customerSchema = mongoose.Schema({
    contact: {
        type: contactSchema,
        required: true
    },
    personalInfo: {
        type: personalInfoSchema,
        required: true
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