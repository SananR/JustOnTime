import { User  } from "../models/userModel.js"
import { OrganizerStatus } from "../models/schemas/organizerInfo.schema.js";

const getUnverifiedOrganizers = async (req, res, next) => {
    User.find({organizer: { info: { verificationStatus: OrganizerStatus.VERIFICATION_IN_PROGRESS } } },
        async (err, users) => {
            if (err){
                return res.status(400).send({
                    message: err.message
                })            
            }
            return res.status(200).send({
                users: users
            })
        })
}

const updateOrganizerStatus = async (req, res, next) => {
    if (!req.user) {
        return res.status(404).send({
            message: "The user is not in the session"
        })
    }    
    if (!req.body.verificationStatus) {
        return res.status(400).send({
            message: "body field 'verificationStatus' is missing"
        })
    }
    const filter = {userInfoL: { email: req.user.email } }
    const update = {organizer: { info: { verificationStatus: req.body.verificationStatus } } }
    const options = { new: true };

    User.findOneAndUpdate(filter, update, options, (err, user) => {
        if(err){
            return res.status(400).send({
                message: err
            })
        }
        return res.status(200).send({
            user: user
        })
    })
}

export { getUnverifiedOrganizers, updateOrganizerStatus }