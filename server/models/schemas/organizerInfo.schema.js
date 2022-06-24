import mongoose from 'mongoose'

const OrganizerStatus = {
    REJECTED: "REJECTED",
    VERIFIED: "VERIFIED",
    SIGNUP_NOT_COMPLETE: "SIGNUP_NOT_COMPLETE",
    VERIFICATION_IN_PROGRESS: "VERIFICATION_IN_PROGRESS",
    NEEDS_RESUBMISSION: "NEEDS_RESUBMISSION"
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