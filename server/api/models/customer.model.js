import mongoose from 'mongoose'
import { contactSchema } from './contact.schema.js'
import { personalInfoSchema } from './personalInfo.schema.js';

const customerSchema = mongoose.Schema({
    contact: {
        type: contactSchema,
        required: true
    },
    personalInfo: {
        type: personalInfoSchema,
        required: true
    }
},  {
    timestamps: true,
});

const Customer = mongoose.model("Customer", customerSchema);

export { Customer }