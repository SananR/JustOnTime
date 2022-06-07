import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config();


async function connectDB() {
    var uri = "mongodb://localhost:27017/justontimedb?directConnection=true"; //process.env.JUSTONTIME_DB_URI (use this on production)
    await mongoose.connect(uri);
}

export { connectDB }