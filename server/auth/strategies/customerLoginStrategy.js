import { Strategy as LocalStrategy } from 'passport-local'
import * as bcrypt from 'bcrypt'

import { Customer } from '../../models/customerModel.js';

function configCustomerLoginStrategy(passport) {
    passport.use("customerLogin",
    new LocalStrategy(
        {usernameField: "email"},
        async (email, password, done) => {
            try{
                const customer = await Customer.findOne({email: email}); //This line must search users using email and password
                console.log(JSON.stringify(customer))
                console.log(password + ' / ' + customer.password);
                if(await bcrypt.compare(password, customer.password)){
                    console.log(email + ' / ' + password);
                    return done(null, customer, {message: "Login Successfull"});  
                }
                else {
                    console.log(JSON.stringify(customer))
                    done(null, false, {message: "Wrong Password"});
                }
            }
            catch(err){
                console.log(err)
                return done(null, false, {message: err});
            }
        }
    )
    )    
}

export { configCustomerLoginStrategy }