import mongoose from 'mongoose'

const bankInfoSchema = mongoose.Schema({
    bankName: {
        type: String,
        required: true,
        trim: true
    },
    branchNum: {
        type: String,
        required: true,
        trim: true
    },
    accountNum: {
        type: String,
        required: true,
        trim: true
    }
});


export { bankInfoSchema }