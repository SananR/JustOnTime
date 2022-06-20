import { EventOrganizer, OrganizerStatus  } from "../models/eventOrganizerModel.js"

const getUnverifiedOrganizers = async (req, res, next) => {
    EventOrganizer.find({verificationStatus: OrganizerStatus.VERIFICATION_IN_PROGRESS}, 
        async (err, users) => {
            if (err){
                return res.status(400).send({
                    message: err.message
                })            
            }
            const allUsers = await EventOrganizer.find();
            console.log(JSON.stringify(allUsers))
            console.log(users)
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
    const filter = {email: req.user.email}    
    const update = {verificationStatus: req.body.verificationStatus}
    const options = { new: true };

    EventOrganizer.findOneAndUpdate(filter, update, options, (err, user) => {
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