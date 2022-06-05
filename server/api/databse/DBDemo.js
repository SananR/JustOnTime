import mongoose from 'mongoose'
import { Customer } from '../models/customer.model.js'; 
import { EventOrganizer } from '../models/eventOrganizer.model.js';
import { Event } from '../models/event.model.js';
import dotenv from 'dotenv';
dotenv.config();


async function demo() {
    var uri = process.env.JUSTONTIME_DB_URI_LOCAL; //process.env.JUSTONTIME_DB_URI (use this on production)
    await mongoose.connect(uri);
    
    // const customer = new Customer(
    //     {contact: {
    //         email: "myemail@gmail.com",
    //         phoneNumber: "myPhoneNumber"
    //     },
    //     personalInfo: {
    //         firstName: "Yuto",
    //         lastName: "Omachi",
    //         address: {
    //             suitNo: "123",
    //             street: "some street",
    //             city: "Toronto",
    //             country: "Canada",
    //             postalCode: "A1A2B2"
    //         }
    //     }
    // });
    
    // try {
    //     await customer.save()
    //     const customers = await Customer.find()
    //     console.log(customers + customers[0].address)
    // } catch(e) {
    //     console.error(e);
    // }
}

export { demo }