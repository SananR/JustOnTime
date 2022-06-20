import mongoose from 'mongoose'
import { bankInfoSchema } from './schemas/organizer/bankInfo.schema.js';
import { addressSchema } from './schemas/address.schema.js';
import validator from 'validator'
const { isEmail, isMobilePhone } = validator

const OrganizerStatus = {
    REJECTED: 0,
    VERIFIED: 1,
    SIGNUP_NOT_COMPLETE: 2,
    VERIFICATION_IN_PROGRESS: 3,
    NEEDS_RESUBMISSION: 4,
}

Object.freeze(OrganizerStatus)

const eventOrganizerSchema = mongoose.Schema({
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
        required: false
    },
    password: {
        type: String,
        required: true,
        select: false
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [isEmail, "please fill a valid email"]
    }, 
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        validator: [isMobilePhone, "please fill a valid phone number"]
    },
    bankInfo: {
        type: bankInfoSchema,
        required: false,
        select: false
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