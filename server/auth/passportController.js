import { userRegisterStrategy, userLoginStrategy } from './strategies/userStrategies.js'
import { User } from "../models/userModel.js";

function configPassportStrategies(passport) {
    passport.use("loginUser", userLoginStrategy);
    passport.use("registerUser", userRegisterStrategy);
}
function configPassportSerialization(passport) {
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser(async (id, done) => {
        try{
            const user = await User.findById(id)
            if (!user) {
                return done(null, await User.findById(id));
            }
            return done(null, user);
        }
        catch(err){
            console.log(err);
            return done(err, false);
        }
    })
}

export { configPassportStrategies, configPassportSerialization }