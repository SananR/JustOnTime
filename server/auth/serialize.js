import { Customer } from "../models/customer.model.js";
import { EventOrganizer } from "../models/eventOrganizer.model.js";

function configSerialization(passport){ 
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        try{
            const customer = await Customer.findById(id)
            if (!customer) {
                return done(null, await EventOrganizer.findById(id));
            }
            return done(null, customer);
        }
        catch(err){
            console.log(err);
            return done(err, false);
        }
    })    
}

export { configSerialization }