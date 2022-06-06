import mongoose from 'mongoose'

const testschema = mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },    
    lastName: {
        type: String,
        required: true,
        trim: true
    }, email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    }, 
    phoneNumber: {
        type: String,
        required: true,
        trim: true,
    },
    password:{
        type: String,
        trim: true,
        required: true,
    }
});

const Customer = mongoose.model("Customer", testschema);
export { Customer }