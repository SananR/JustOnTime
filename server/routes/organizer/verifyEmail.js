import express from 'express';
import { EventOrganizer } from '../../models/eventOrganizer.model.js';
import { VerificationToken } from '../../models/verificationToken.model.js';
const router = express.Router();

router
    .route("/organizer/verifyemail/:email/:token")
    .get(async (req, res, next) => {
        const foundToken = await VerificationToken.find();
        VerificationToken.findOne({token: req.params.token}, (err, token) => {
            if (!token){
                return res.status(400).send({msg:'Your verification link may have expired. Please click on resend for verify your Email.'});
            }
            else {
                EventOrganizer.findOne({ _id: token._userId, email: req.params.email}, (err, user) => {
                    if (!user){
                        return res.status(401).send({msg:'We were unable to find a user for this verification. Please SignUp!'});
                    } 
                    // user is already verified
                    else if (user.isVerified){
                        return res.status(200).send('User has been already verified. Please Login');
                    }
                    // verify user
                    else{
                        // change isVerified to true
                        user.isVerified = true;
                        user.save(function (err) {
                            // error occur
                            if(err){
                                return res.status(500).send({msg: err.message});
                            }
                            // account successfully verified
                            else{
                              return res.status(200).send('Your account has been successfully verified');
                            }
                        });
                    }
                })
            }
        })
    })


export { router }
