import express from 'express';
import mongoose from 'mongoose';

const router = express.Router();

router
    .route("/")
    .get((req, res, next) => {
        const customer =
            {contact: {
                email: "myemail2356@gmail.com",
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
            },
            password: "ABCD1234"
        };
        res.send(customer)
    })
    
export { router }
