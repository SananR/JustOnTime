import { Strategy as LocalStrategy } from 'passport-local'
import * as bcrypt from 'bcrypt'

import { Customer } from '../../models/userModel.js';

export const userRegisterStrategy =
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
                await customer.save()
                done(null, customer, {});
            }
            catch(err) {
                return done(err)
            }
        }
    );

export const userLoginStrategy =
    new LocalStrategy(
        {usernameField: "email"},
        async (email, password, done) => {
            try {
                const customer = await Customer.findOne({email: email}); //This line must search users using email and password
                if (await bcrypt.compare(password, customer.password)) {
                    return done(null, customer, {message: "Login successful"});
                }
                else {
                    done(null, false, {message: "Wrong password"});
                }
            }
            catch(err) {
                return done(null, false, {message: err});
            }
        }
    );