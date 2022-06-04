import mongoose from 'mongoose'
import { bankInfoSchema } from './bankInfo.schema.js';
import { contactSchema } from './contact.schema.js'
import { personalInfoSchema } from './personalInfo.schema.js';

const eventOrganizerSchema = mongoose.Schema({
    contact: {
        type: contactSchema,
        required: true
    },
    personalInfo: {
        type: personalInfoSchema,
        required: true
    },
    bankInfo: {
        type: bankInfoSchema,
        required: true
    }
},  {
    timestamps: true,
});

const EventOrganizer = mongoose.model("EventOrganizer", eventOrganizerSchema);

export { EventOrganizer }