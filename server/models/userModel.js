import mongoose from 'mongoose'
import { userInfoSchema } from "./schemas/userInfo.schema.js";
import { BidInfo } from './schemas/event/bidInfo.schema.js';
import { organizerInfoSchema } from "./schemas/organizerInfo.schema.js";

const userSchema = mongoose.Schema({
    userInfo: userInfoSchema,
    organizer: {
        info: organizerInfoSchema,
        required: false
    },
    userType: {
        type: String,
        required: true,
        enum : ['Organizer','Customer', 'Admin'],
        default: 'Customer'
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    bidHistory: {
        type: [BidInfo],
        required: false,
        trim: true,
        default:[]
    }
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export { User }