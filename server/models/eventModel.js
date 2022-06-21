import mongoose from 'mongoose'
import { eventInfoSchema } from './schemas/event/eventInfo.schema.js'
import { bidInfoSchema } from './schemas/event/bidInfo.schema.js';

const eventSchema = mongoose.Schema({
    eventInfo: {
        type: eventInfoSchema,
        required: true
    },
    tags: {
        type: [String],
        required: false
    },
    bidHistory: {
        type: [bidInfoSchema],
        required: false,
        trim: true
    },
    organizer_id: {
        type: mongoose.Schema.Types.ObjectId, // referes to the eventOrganizer's id
        required: false
    },
    eventImage: {
        id: {
            type: mongoose.Schema.Types.ObjectId, // referes to the eventImage's id
            required: true
        }
    }

});

const Event = mongoose.model("Event", eventSchema);

export { Event }