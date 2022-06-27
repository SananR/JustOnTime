import { User  } from "../models/userModel.js"
import { Event } from "../models/eventModel.js"
import { OrganizerStatus } from "../models/schemas/organizerInfo.schema.js";
import { EventStatus } from "../models/schemas/event/eventInfo.schema.js"
import { clientError, successWithData } from "../util/http/httpResponse.js";

const getUnverifiedOrganizers = (req, res, next) => {
    User.find({'organizer.info.verificationStatus': OrganizerStatus.VERIFICATION_IN_PROGRESS},
        async (err, users) => {
            if (err){
                return clientError(res,  err.message)            
            }
            return successWithData(res, {users: users})
        })
}

const updateOrganizerStatus = async (req, res, next) => {
    if (!req.body.verificationStatus) {
        return clientError(res, "body field 'verificationStatus' is missing")
    }
    const filter = {'userInfo.email': req.body.email } 
    const update = {'organizer.info.verificationStatus': req.body.verificationStatus }
    const options = { runValidators: true, new: true };

    User.findOneAndUpdate(filter, update, options, (err, user) => {
        if(err){
            return clientError(res, err)
        }
        return successWithData(res, {user: user})
    })
}

const getUnverifiedEvents = async (req, res, next) => {
    Event.find({'eventInfo.status': EventStatus.UNDER_REVIEW},
        (err, events) => {
            if (err){
                return clientError(res,  err.message)            
            }
            return successWithData(res, {events: events})
        })
}

const updateEventStatus = async (req, res, next) => {
    if (!req.body.eventStatus) {
        return clientError(res, "body field 'verificationStatus' is missing")
    }
    const filter = {_id: req.body.eventId } 
    const update = {'eventInfo.status': req.body.eventStatus }
    const options = { runValidators: true, new: true };

    Event.findOneAndUpdate(filter, update, options, (err, event) => {
        if(err){
            return clientError(res, err)
        }
        return successWithData(res, {event: event})
    })
}

export { getUnverifiedOrganizers, updateOrganizerStatus, getUnverifiedEvents, updateEventStatus }