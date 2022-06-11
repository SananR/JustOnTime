import { Strategy as LocalStrategy } from 'passport-local'
import * as bcrypt from 'bcrypt'

import { Customer } from '../../models/customerModel.js'

function customerRegisterStrategy(passport) {
    passport.use("registerCustomer",
    new LocalStrategy({
        usernameField: "email",
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
                console.log(JSON.stringify(req.body))
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
            catch(err){
                return done(err)
            }
        }
        ));
}

export { customerRegisterStrategy }