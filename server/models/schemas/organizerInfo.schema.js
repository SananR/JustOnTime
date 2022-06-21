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
        trim: true
    },
    verificationStatus: {
        type: String,
        enum: ["REJECTED", "VERIFIED", "SIGNUP_NOT_COMPLETE", "VERIFICATION_IN_PROGRESS", "NEEDS_RESUBMISSION"],
        default: "SIGNUP_NOT_COMPLETE"
    }
});

export { OrganizerStatus, organizerInfoSchema }