import { flagError, clientError, serverError, success } from "../util/http/httpResponse.js";
import {Event} from '../models/eventModel.js'
import { eventImageService } from "../util/multer.js";
import { validationResult } from 'express-validator';
import {User} from '../models/userModel.js'

const addEvent = async (req, res, next) => {
    const { file } = req;
    const { path } = file;
    let user;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        eventImageService.deleteImage(path);
        return clientError(res, errors.array());
    }
    else{
        if (file.size > 10000000) {
            eventImageService.deleteImage(path);
            return  clientError(res, "File may not extend 10 mb");
        }
        try{
            user = await User.findById(req.query.id);
        }catch(err){
            eventImageService.deleteImage(path);
            return clientError(res, "No such organizer")
        }
        try{
            const event = new Event(
                {
                    eventInfo: {
                        name: req.body.name,
                        description: req.body.description,
                        time: req.body.time,
                        address:{
                            street: req.body.street,
                            city: req.body.city,
                            country: req.body.country,
                            postalCode: req.body.postalCode
                        }
                    },
                    tags: req.body.tags,
                    bidHistory: req.body.bidHistory,
                    organizer_id: user._id,
                    eventImage_path:path
                }
            )
            await event.save();
            return success(res, "Event Successfully added");
        } catch(err) {
            eventImageService.deleteImage(path);
            return clientError(res, "Event couldnot be added")
        }
    }
}

const getEvents = async (req, res, next) => {
    try{
        Event.find({ 'eventInfo.status': 'Ongoing' })
            .exec()
            .then(output => {
                const response = {
                    count: output.length,
                    events: output.map(out => {
                        return {
                            name: out.eventInfo.name,
                            description: out.eventInfo.description,
                            address:{
                                street: out.eventInfo.address.street,
                                city: out.eventInfo.address.city,
                                country: out.eventInfo.address.country,
                                postalCode: out.eventInfo.address.postalCode
                            },
                            eventImage_path: out.eventImage_path,
                            bidHistory: out.bidHistory
                        };
                    })
                };
            return res.status(200).json(response);
            });
    } catch(err){
        return clientError(res, "No events found");
    }
}

const getOrganizerEvents =  async (req, res, next) => {
    try{
        Event.find({ 'organizer_id': req.query.id })
            .exec()
            .then(output => {
                const response = {
                    count: output.length,
                    events: output.map(out => {
                        return {
                            name: out.eventInfo.name,
                            description: out.eventInfo.description,
                            address:{
                                street: out.eventInfo.address.street,
                                city: out.eventInfo.address.city,
                                country: out.eventInfo.address.country,
                                postalCode: out.eventInfo.address.postalCode
                            },
                            eventImage_path: out.eventImage_path,
                            bidHistory: out.bidHistory
                        };
                    })
                };
            return res.status(200).json(response);
            });
    } catch(err){
        return clientError(res, "No events found");
    }
}
export {addEvent, getEvents, getOrganizerEvents}
