import mongoose from 'mongoose'
import { bankInfoSchema } from './schemas/organizer/bankInfo.schema.js';
import { contactSchema } from './schemas/contact.schema.js'
import { personalInfoSchema } from './schemas/personalInfo.schema.js';

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
    },
    password: {
        type: String,
        required: true
    }
},  {
    timestamps: true,
});

const EventOrganizer = mongoose.model("EventOrganizer", eventOrganizerSchema);

export { EventOrganizer }