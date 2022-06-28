import { flagError, clientError, serverError, success } from "../util/http/httpResponse.js";
import {Event} from '../models/eventModel.js'
import { eventImageService } from "../util/multer.js";
import { validationResult } from 'express-validator';
import {User} from '../models/userModel.js'

const addEvent = async (req, res, next) => {
    
    if(!req.file){
        return clientError(res, "No image is added");
    }
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
                            id: output._id,
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
                            id: output._id,
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

const updateEvents = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.file){
            eventImageService.deleteImage(req.file.path);
        }
        return clientError(res, errors.array());
    }
    Event.findOne({ _id: req.query.eventId}, (err, event) => {
        if (!event) {return clientError(res, "No such event exists ");}
        else if (event.eventInfo.staus == "Ongoing" || event.eventInfo.staus == "Completed"){
          return clientError(res, "event cannot be updated");
        }
        let deletepath = event.eventImage_path
        console.log(deletepath)
        if (req.file){
            const update = {
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
                eventImage_path: req.file.path
            }
            Event.updateOne(update, (err, user) => { 
                if (err) {return serverError(res, "event couldn't be updated");}
                try{
                    eventImageService.deleteImage(deletepath);
                }catch{
                    eventImageService.deleteImage(req.file.path);
                    return serverError(res, "event couldn't be successfully updated");
                }
                return success(res, "event successfully updated", false);
              }); 
        }
        else{
            const update = {
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
                tags: req.body.tags
            }
            Event.updateOne(update, (err, user) => { 
                if (err) {return serverError(res, "event couldn't be updated");}
                return success(res, "event successfully updated", false);
            }); 
        }
        
      });
}
export {addEvent, getEvents, getOrganizerEvents, updateEvents }
