import mongoose from 'mongoose'
import { addressSchema } from '../address.schema.js'

const EventStatus = {
    REJECTED: "REJECTED",
    UNDER_REVIEW: "UNDER_REVIEW",
    NEEDS_RESUBMISSION: "NEEDS_RESUBMISSION",
    ONGOING: "ONGOING",
    COMPLETED: "COMPLETED",
    CANCELED: "CANCELED"
}

Object.freeze(EventStatus)

const eventInfoSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    date: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    auctionEnd: {
        type: Date,
        required: true
    },
    address: {
        type: addressSchema,
        required: false
    },
    status: {
        type: String,
        required: false,
        enum : ["REJECTED", "UNDER_REVIEW", "NEEDS_RESUBMISSION", "ONGOING", "COMPLETED", "CANCELED"],
        default: 'UNDER_REVIEW'
    }
});

export { eventInfoSchema, EventStatus }