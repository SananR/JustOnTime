import mongoose from "mongoose";

const verificationTokenSchema = mongoose.Schema({
    _userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    expireAt: { 
        type: Date, 
        default: Date.now, 
        index: { expires: 86400000 } 
    }
});

const VerificationToken = mongoose.model("VerificationToken", verificationTokenSchema);

export { VerificationToken }