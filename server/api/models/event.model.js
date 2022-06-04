import mongoose from 'mongoose'
import { eventInfoSchema } from './eventInfo.schema.js'
import { bidInfoSchema } from './bidInfo.schema.js';

const eventSchema = mongoose.Schema({
    eventInfo: {
        type: eventInfoSchema,
        required: true
    },
    tags: {
        type: [String],
        required: true
    },
    bidHistory: {
        type: [bidInfoSchema],
        required: true,
        trim: true
    },
    organizerInfo: {
        id: {
            type: mongoose.Schema.Types.ObjectId, // referes to the eventOrganizer's id
            required: true
        }, 
        name: {
            type: String,
            required: true
        }
    }
});

const Event = mongoose.model("Event", eventSchema);

export { Event }