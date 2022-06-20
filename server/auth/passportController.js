import { customerRegisterStrategy } from './strategies/customerRegisterStrategy.js'
import { organizerRegisterStrategy } from './strategies/organizerRegisterStrategy.js'
import {Customer} from "../models/customerModel.js";
import {EventOrganizer} from "../models/eventOrganizerModel.js";

function configPassportStrategies(passport) {
    passport.use("registerCustomer", organizerRegisterStrategy);
    passport.use("registerCustomer", customerRegisterStrategy);
}
function configPassportSerialization(passport) {
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

export { configPassportStrategies, configPassportSerialization }