import { Strategy as LocalStrategy } from 'passport-local'
import * as bcrypt from 'bcrypt'

import { EventOrganizer } from '../../models/eventOrganizerModel.js';


function organizerRegisterStrategy(passport) {
    passport.use("registerOrganizer",
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
                // const hashedBankName = await bcrypt.hash(req.body.bankName, 10);
                // const hashedBranchNum = await bcrypt.hash(req.body.branchNum, 10);
                // const hashedAccountNum = await bcrypt.hash(req.body.accountNum, 10);
                
                const eventOrganizer = new EventOrganizer(
                    {
                        email: email,
                        phoneNumber: req.body.phoneNumber,
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        password: hashedPassword,
                        address: {
                            suitNo: req.body.suitNo,
                            street: req.body.street,
                            city: req.body.city,
                            country: req.body.country,
                            postalCode: req.body.postalCode
                        }
                    // bankInfo: {
                    //     bankName: hashedBankName,
                    //     branchNum: hashedBranchNum,
                    //     accountNum: hashedAccountNum
                    // },
                });
                await eventOrganizer.save()
                done(null, eventOrganizer, {});
            }
            catch(err){
                return done(err)
            }
        }
        ));
}

export { organizerRegisterStrategy }