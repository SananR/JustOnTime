import { EventOrganizer, OrganizerStatus  } from "../models/eventOrganizerModel.js"

const getUnverifiedEvents = async (req, res, next) => {
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

export { getUnverifiedEvents }