import mongoose from 'mongoose'
import { bankInfoSchema } from './schemas/organizer/bankInfo.schema.js';
import { contactSchema } from './schemas/contact.schema.js'
import { personalInfoSchema } from './schemas/personalInfo.schema.js';

const OrganizerStatus = {
    REJECTED: 0,
    VERIFIED: 1,
    SIGNUP_NOT_COMPLETE: 2,
    VERIFICATION_IN_PROGRESS: 3,
    NEEDS_RESUBMISSION: 4,
}

Object.freeze(OrganizerStatus)

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
        required: false
    },
    password: {
        type: String,
        required: true
    },
    verificationStatus: {
        type: Number,
        default: OrganizerStatus.VERIFICATION_IN_PROGRESS
    }
},  {
    timestamps: true,
});

const EventOrganizer = mongoose.model("EventOrganizer", eventOrganizerSchema);

export { EventOrganizer, OrganizerStatus }