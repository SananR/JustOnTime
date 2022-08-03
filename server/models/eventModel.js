import mongoose from 'mongoose'
import { eventInfoSchema } from './schemas/event/eventInfo.schema.js'
import { BidInfo } from './schemas/event/bidInfo.schema.js';



var eventSchema = mongoose.Schema({
    eventInfo: {
        type: eventInfoSchema,
        required: true
    },
    tags: {
        type: [String],
        required: false
    },
    bidHistory: {
        type: [BidInfo],
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

eventSchema.index({
    'eventInfo.name': "text",
    tags: "text"
},
{
    weights:{
        'eventInfo.name': 5,
        tags: 1
    },
    name: "eventSearchIndex"
})

const Event = mongoose.model("Event", eventSchema);

export { Event }