import { Strategy as LocalStrategy } from 'passport-local'
import * as bcrypt from 'bcrypt'

import { Customer } from '../../models/customerModel.js'

export const customerRegisterStrategy =
    new LocalStrategy({
        usernameField: "email",
        passReqToCallback: true
        },
        async (req, email, password, done) => {
            if (typeof email !== 'string' || typeof password !== 'string') return done(null, false, {message: "Invalid input types"});
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const customer = new Customer(
                    {
                    email: email,
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    password: hashedPassword
                });
                console.log(JSON.stringify(customer))
                await customer.save()
                done(null, customer, {});
            }
            catch(err) {
                return done(err)
            }
        }
    );