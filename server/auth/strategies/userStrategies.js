import { Strategy as LocalStrategy } from 'passport-local'
import * as bcrypt from 'bcrypt'

import { User } from '../../models/userModel.js';

export const userRegisterStrategy =
    new LocalStrategy({
            usernameField: "email",
            passReqToCallback: true
        },
        async (req, email, password, done) => {
            if (typeof email !== 'string' || typeof password !== 'string') return done(null, false, {message: "Invalid input types"});
            try {
                const hashedPassword = await bcrypt.hash(password, 10);
                const user = new User(
                    {
                            userInfo: {
                                email: email,
                                firstName: req.body.firstName,
                                lastName: req.body.lastName,
                                password: hashedPassword
                            }
                    });
                await user.save()
                done(null, user, {});
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
                const user = await User.findOne({ 'userInfo.email': email }); //This line must search users using email and password
                if (await bcrypt.compare(password, user.userInfo.password)) {
                    return done(null, user, {message: "Login successful"});
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