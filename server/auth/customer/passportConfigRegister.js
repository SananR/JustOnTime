import { Strategy as LocalStrategy } from 'passport-local'
import * as bcrypt from 'bcrypt'

import { Customer } from '../../models/customer.model.js'


function configCustomerRegisterStrategy(passport) {
    passport.use("registerCustomer",
    new LocalStrategy({
        usernameField: "email",
        passwordField: "password",
        passReqToCallback: true
        },
        async (req, email, password, done) => {
            console.log("request body verifying");
            console.log(email);
            console.log(password);
            if(typeof email !== 'string'
                || typeof password !== 'string'){
                    return done(null, false, {message: "invalid input types"});
                }
                console.log("request body verified");
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                
                const customer = new Customer(
                    {contact: {
                        email: email,
                        phoneNumber: req.body.phoneNumber
                    },
                    personalInfo: {
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        address: {
                            suitNo: req.body.suitNo,
                            street: req.body.street,
                            city: req.body.city,
                            country: req.body.country,
                            postalCode: req.body.postalCode
                        }
                    },
                    password: hashedPassword
                });
                await customer.save()
                done(null, customer, {});
            }
            catch(err){
                return done(err)
            }
        }
        ))
}

export { configCustomerRegisterStrategy }