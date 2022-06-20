import mongoose from 'mongoose'

const OrganizerStatus = {
    REJECTED: 0,
    VERIFIED: 1,
    SIGNUP_NOT_COMPLETE: 2,
    VERIFICATION_IN_PROGRESS: 3,
    NEEDS_RESUBMISSION: 4
}

Object.freeze(OrganizerStatus)

const organizerInfoSchema = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        validator: [isMobilePhone, "Provide a valid phone number"]
    },
    verificationStatus: {
        type: Number,
        default: OrganizerStatus.VERIFICATION_IN_PROGRESS
    }
});

export { OrganizerStatus, organizerInfoSchema }