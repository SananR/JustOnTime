import { ObjectId } from 'mongodb';
import mongoose from 'mongoose'

const bidInfoSchema = mongoose.Schema({
    uid: {
        type: ObjectId,
        required: true
    },
    bidPrice: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    }
});


export { bidInfoSchema }