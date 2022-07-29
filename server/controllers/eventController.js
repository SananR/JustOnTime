import {clientError, serverError, success, successWithData} from "../util/http/httpResponse.js";
import {Event} from '../models/eventModel.js'
import { eventImageService } from "../util/ImageService.js";
import { validationResult } from 'express-validator';
import mongoose from "mongoose";
import path from "path";
import console from "console";
import Fuse from 'fuse.js'

const getEventImage = async (req, res, next) => {
    if (!req.query.id) return clientError(res, "Must provide an event ID.");
    else if (!mongoose.isValidObjectId(req.query.id)) return clientError(res, "Invalid event ID provided.");
    try {
        const event = await Event.findById(req.query.id);
        if (!event) return clientError(res, "No image found for provided event ID.");
        const resolved = path.resolve(event.eventImagePath);
        return res.status(200).sendFile(resolved, {root: ""});
    } catch (err) {
        console.error(err);
        return serverError(res, "An unexpected error occurred.");
    }
}

const addEvent = async (req, res, next) => {
    const errors = validationResult(req);
    if (!req.files) {
        return clientError(res, 'Invalid file provided.');
    }
    const files = req.files;
    const eventImagepath = req.files.mainImage[0].path;
    const ImagePathArray = []
    if(req.files.images != null){
        req.files.images.forEach(image => {
            ImagePathArray.push(image.path)
        });
    }
    if (!errors.isEmpty()) {
        eventImageService.deleteImage(eventImagepath);
        if(ImagePathArray.length != 0){
            ImagePathArray.forEach(path => {
                eventImageService.deleteImage(path);
            });
        }
        return clientError(res, errors.array());
    }

    try{
        const event = new Event(
            {
                eventInfo: {
                    name: req.body.name,
                    description: req.body.description,
                    time: req.body.time,
                    date: req.body.date,
                    address:{
                        street: req.body.street,
                        city: req.body.city,
                        country: req.body.country,
                        postalCode: req.body.postalCode
                    }
                },
                tags: req.body.tags,
                bidHistory: req.body.bidHistory,
                organizerId: req.user._id,
                eventImagePath: eventImagepath,
                ImagePathArray: ImagePathArray
            }
        )
        await event.save();
        return success(res, "Event successfully created.", true);
    } catch(err) {
        eventImageService.deleteImage(eventImagepath);
        if(ImagePathArray.length != 0){
            ImagePathArray.forEach(path => {
                eventImageService.deleteImage(path);
            });
        }
        if (err.message.includes("duplicate"))
            return clientError(res, "An event with similar information already exists.")
        return serverError(res, "An error occurred, event could not be added")
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
                            id: out._id,
                            name: out.eventInfo.name,
                            description: out.eventInfo.description,
                            time: out.eventInfo.time,
                            date: out.eventInfo.date,
                            location: out.eventInfo.address.street,
                            eventImagePath: out.eventImagePath,
                            bidHistory: out.bidHistory,
                            ImagePathArray: out.ImagePathArray
                        };
                    })
                };
                return successWithData(res, response, false);
            });
    } catch(err){
        return clientError(res, "No events found");
    }
}

const getAnEvent = async (req, res, next) => {
    if (!req.query.id) return clientError(res, "Must provide an event ID.");
    else if (!mongoose.isValidObjectId(req.query.id)) return clientError(res, "Invalid event ID provided.");
    try {
        const event = await Event.findById(req.query.id);
        if (!event) return clientError(res, "No event found for provided event ID.");
        const organizer = await User.findById(event.organizerId);
        const result = {...event._doc, organizerName: organizer.userInfo.firstName + " " + organizer.userInfo.lastName }
        return successWithData(res, result, false);
    } catch (err) {
        console.error(err);
        return serverError(res, "An unexpected error occurred.");
    }
}

const getOrganizerEvents =  async (req, res, next) => {
    try{
        Event.find({ 'organizerId': req.query.id })
            .exec()
            .then(output => {
                const response = {
                    count: output.length,
                    events: output.map(out => {
                        return {
                            id: out._id, 
                            name: out.eventInfo.name,
                            description: out.eventInfo.description,
                            address:{
                                street: out.eventInfo.address.street,
                                city: out.eventInfo.address.city,
                                country: out.eventInfo.address.country,
                                postalCode: out.eventInfo.address.postalCode
                            },
                            eventImagePath: out.eventImagePath,
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
const getSearchedEvents = async (req, res, next) => {
    try{
        var searchTerm = req.query.searchTerm;
        if(!req.query.searchTerm){
            Event.find().limit(10).exec()
            .then(output => {
                const response = {
                    count: output.length,
                    events: output.map(out => {
                        return {
                            id: out._id,
                            name: out.eventInfo.name,
                            description: out.eventInfo.description,
                            time: out.eventInfo.time,
                            date: out.eventInfo.date,
                            location: out.eventInfo.address.street,
                            eventImagePath: out.eventImagePath,
                            bidHistory: out.bidHistory,
                            ImagePathArray: out.ImagePathArray
                        };
                    })
                };
            return res.status(200).json(response);
            });
        }
        else{
            const options = {
                includeScore: true,
                keys: ['name','tags']
            }
            const events = Event.find().exec()
                .then(output => {
                    const response = {
                        count: output.length,
                        events: output.map(out => {
                            return {
                                id: out._id,
                                name: out.eventInfo.name,
                                description: out.eventInfo.description,
                                time: out.eventInfo.time,
                                date: out.eventInfo.date,
                                location: out.eventInfo.address.street,
                                eventImagePath: out.eventImagePath,
                                bidHistory: out.bidHistory,
                                ImagePathArray: out.ImagePathArray
                            };
                        })
                    };
                    console.log(response.events)
                    const fuse = new Fuse(response.events, options);
                    const result = fuse.search(searchTerm);
                    return res.status(200).json(result);
                });
        }
    }catch (err) {
        console.error(err);
        return serverError(res, "An unexpected error occurred.");
    }
}
const updateEvents = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        if (req.files){
            eventImageService.deleteImage(eventImagepath);
            if(req.files.images != null){
                const ImagePathArray = req.files.images.path;
                ImagePathArray.forEach(path => {
                    eventImageService.deleteImage(path);
                });
            }
        }
        return clientError(res, errors.array());
    }
    Event.findOne({ _id: req.query.eventId}, (err, event) => {
        if (!event) {return clientError(res, "No such event exists ");}
        else if (event.eventInfo.status == "Ongoing" || event.eventInfo.status == "Completed"){
          return clientError(res, "event cannot be updated");
        }
        let deletepath = event.eventImagePath
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
                eventImagePath: req.file.path
            }
            Event.updateOne(update, (err, user) => { 
                if (err) {
                    eventImageService.deleteImage(req.file.path)
                    return serverError(res, "event couldn't be updated");
                }
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
export {addEvent, getEvents, getAnEvent, getOrganizerEvents, updateEvents, getEventImage, getSearchedEvents }
