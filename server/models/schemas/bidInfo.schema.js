import mongoose from 'mongoose'

const bidInfoSchema = mongoose.Schema({
    uid: {
        type: mongoose.Schema.Types.ObjectId,
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