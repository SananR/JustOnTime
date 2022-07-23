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
    organizerId: {
        type: mongoose.Schema.Types.ObjectId, // referes to the eventOrganizer's id
        required: true
    },
    eventImagePath:{
        type: String, // referes to the eventImage's id
        required: true
    },
    ImagePathArray:{
        type: [String],
        required: false
    }

});

const Event = mongoose.model("Event", eventSchema);

export { Event }