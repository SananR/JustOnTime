import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const bidInfoSchema = mongoose.Schema({
    uid: {
        type: ObjectId,
        required: true
    },
    bidAmount: {
        type: Number,
        required: true
    },
    timeStamp: {
        type: Number,
        default: Date.now()
    }
});


export { bidInfoSchema as BidInfo }