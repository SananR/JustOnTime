import { flagError, clientError, serverError, success } from "../util/http/httpResponse.js";
import {Event} from '../models/eventModel.js'
import { deleteImage } from "../util/gridFs.js";
import { validationResult } from 'express-validator';

const addEvent = async (req, res, next) => {
    const { file } = req;
    const { id } = file;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        deleteImage(id);
        return clientError(res, errors.array());
    }
    else{
        if (file.size > 10000000) {
        deleteImage(id);
        return  clientError(res, "File may not extend 10 mb");
        }
        try{
            const user = await User.findOne({ 'userInfo.email': req.body.email });
        }catch(err){
            deleteImage(id);
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
                    eventImage:{
                        id: id
                    }
                }
            )
            await event.save();
            return success(res, "Event Successfully added");
        } catch(err) {
            return clientError(res, "Event couldnot be added")
        }
    }
}

    

export {addEvent}
