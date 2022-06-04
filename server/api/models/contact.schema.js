import mongoose from 'mongoose'
import validator from 'validator'
import { Customer } from './customer.model.js';
const { isEmail, isMobilePhone } = validator

// const emailValidator = async (inputEmail) => {
//     if (!isEmail(inputEmail)) return false;
//     const result = await Customer.find({email: inputEmail})
//     console.log(result)
//     if (result != []) return false;
//     console.log(inputEmail)
//     return true;
// }

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