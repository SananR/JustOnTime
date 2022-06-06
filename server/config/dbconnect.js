//Connection file to mongo db
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config()

const connectdB = async () => {
  try {
    const conn = await mongoose.connect("mongodb+srv://Arya:arya12@cluster0.ehq1k.mongodb.net/?retryWrites=true&w=majority", {
      useNewUrlParser: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

export default connectdB;