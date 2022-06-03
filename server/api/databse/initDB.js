import mongoose from 'mongoose'
import { User } from '../models/user.model.js'
import dotenv from 'dotenv';
dotenv.config();


async function run() {
    var uri = process.env.JUSTONTIME_DB_URI_LOCAL; //process.env.JUSTONTIME_DB_URI (use this on production)
    mongoose.connect(uri,
        () => {
            console.log("connected");
            const user = new User({username: "Yuto"});
            console.log(user)
            user.save()
                .then(() => console.log("Added user!"))
                .catch(err => console.error("Error: " + err))
        },
        e => {
            console.error(e)
        });
}

export { run }