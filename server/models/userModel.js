import mongoose from 'mongoose'
import { userInfoSchema } from "./schemas/userInfo.schema.js";
import { organizerInfoSchema } from "./schemas/organizerInfo.schema.js";

const userSchema = mongoose.Schema({
    userInfo: userInfoSchema,
    organizer: {
        info: organizerInfoSchema,
        required: false
    },
    isVerified: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export { User }