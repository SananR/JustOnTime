import {ActionTypes} from "./AuctionHandler.js";
import mongoose from "mongoose";
import {clientError} from "../http/httpResponse.js";
import {Event} from "../../models/eventModel.js";
import {User} from "../../models/userModel.js";

const validateAuctionAction = (action, socket) => {
    const data = action || "";
    try {
        const parsed = JSON.parse(data);
        //Has common AuctionAction data
        if (!parsed.hasOwnProperty("action") || !parsed.hasOwnProperty("timeStamp") || !parsed.hasOwnProperty("data") || !ActionTypes.hasOwnProperty(parsed.action)) {
            socket.send(JSON.stringify(createResponse(404, {"message": "Invalid AuctionAction format provided."})));
            return false;
        }
        const action = parsed.action;
        switch (action) {
            case ActionTypes.BID_PLACE:
                return validateBidPlaceAction(parsed, socket);
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
const validateBidPlaceAction = async (parsedAction, socket) => {
    if (!parsedAction.data.hasOwnProperty("uid") || !parsedAction.data.hasOwnProperty("aid") || !parsedAction.data.hasOwnProperty("bidAmount")) {
        socket.send(JSON.stringify(createResponse(404, {"message": "Invalid BID_PLACE AuctionAction format provided."})));
        return false;
    }
    const uid = parsedAction.data.uid;
    const aid = parsedAction.data.aid;
    const aidValid = await validateAuctionId(aid);
    const uidValid = await validateUserId(uid);
    if (!aidValid) {
        socket.send(JSON.stringify(createResponse(404, {"message": "No auction found with the associated ID."})));
        return false;
    } else if (!uidValid) {
        socket.send(JSON.stringify(createResponse(404, {"message": "No user found with the associated ID."})));
        return false;
    }
    return true;
}

const validateAuctionId = async (aid) => {
    try {
        if (!mongoose.isValidObjectId(aid)) return false;
        const event = await Event.findById(aid);
        return !!(event);
    } catch (err) {
        console.log(err);
        return false;
    }
}
const validateUserId = async (uid) => {
    try {
        if (!mongoose.isValidObjectId(uid)) return false
        const user = await User.findById(uid);
        return !!(user);
    } catch (err) {
        console.log(err);
        return false;
    }
}

const createResponse = (statusCode, data) => {
    return {
        "statusCode": statusCode,
        "data": data
    }
}

export {validateAuctionAction, createResponse}