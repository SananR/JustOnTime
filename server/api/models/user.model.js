import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3
    },
},  {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export { User }