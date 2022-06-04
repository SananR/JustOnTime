import mongoose from 'mongoose'
import { Customer } from '../models/customer.model.js'; 
import { EventOrganizer } from '../models/eventOrganizer.model.js';
import { Event } from '../models/event.model.js';
import dotenv from 'dotenv';
dotenv.config();


async function demo() {
    var uri = process.env.JUSTONTIME_DB_URI_LOCAL; //process.env.JUSTONTIME_DB_URI (use this on production)
    mongoose.connect(uri,
        () => {
            console.log("connected");
            const customer = new Customer(
                {contact: {
                    email: "myemail@gmail.com",
                    phoneNumber: "myPhoneNumber"
                },
                personalInfo: {
                    firstName: "Yuto",
                    lastName: "Omachi",
                    address: {
                        suitNo: "123",
                        street: "some street",
                        city: "Toronto",
                        country: "Canada",
                        postalCode: "A1A2B2"
                    }
                }
            });
            customer.save()
                .then(async () => {
                    console.log("Added user!")
                    const customers = await Customer.find()
                    console.log(customers)
                })
                .catch(err => console.error("Error: " + err))
        },
        e => {
            console.error(e)
        });
}

export { demo }