import { Strategy as LocalStrategy } from 'passport-local'
import * as bcrypt from 'bcrypt'

import { EventOrganizer } from '../../models/eventOrganizerModel.js';


function configOrganizerLoginStrategy(passport) {
    passport.use("organizerLogin",
    new LocalStrategy(
        {usernameField: "email"},
        async (email, password, done) => {
            try{
                console.log(email + " / " + password)
                const eventOrganizer = await EventOrganizer.find({email: email}); //This line must search users using email and password
                console.log(JSON.stringify(eventOrganizer))
                // bcrypt is not comparing correctly
                if(await bcrypt.compare(password, eventOrganizer.password)){
                    console.log(JSON.stringify(eventOrganizer))
                    return done(null, eventOrganizer, {message: "Login Successfull"});  
                }
                else {
                    done(null, false, {message: "Wrong Password"});
                }
            }
            catch(err){
                return done(null, false, {message: err});
            }
        }
    )
    )    
}

export { configOrganizerLoginStrategy }
