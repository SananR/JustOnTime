import mongoose from 'mongoose'
import validator from 'validator'
const { isEmail, isMobilePhone } = validator

const contactSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: [isEmail, "please fill a valid email"]
    }, 
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
        validator: [isMobilePhone, "please fill a valid phone number"]
    }
});

export { contactSchema }