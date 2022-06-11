import mongoose from 'mongoose'

const customerSchema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },      
    lastName: {
        type: String,
        required: true,
        trim: true
    },    
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
},  {
    timestamps: true,
});

const Customer = mongoose.model("Customer", customerSchema);

export { Customer }