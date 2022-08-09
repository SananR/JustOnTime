import {ActionTypes} from "./AuctionHandler.js";
import mongoose from "mongoose";
import {Event} from "../../models/eventModel.js";
import {User} from "../../models/userModel.js";

const validateAuctionAction = (action, socket) => {
    const data = action || "";
    let parsed;
    try {
        parsed = JSON.parse(data);
    } catch (err) {
        socket.send(JSON.stringify(createResponse("VALIDATION_FAILED",400, "Invalid AuctionAction format provided.")));
        return false;
    }
    try {
        //Has common AuctionAction data
        if (!validateFields(parsed, ["action", "timeStamp", "data"], ["string", "number", "object"]) || !ActionTypes.hasOwnProperty(parsed.action)) {
            socket.send(JSON.stringify(createResponse("VALIDATION_FAILED",400, "Invalid AuctionAction format provided.")));
            return false;
        }
        const action = parsed.action;
        switch (action) {
            case ActionTypes.BID_PLACE:
                return validateBidPlaceAction(parsed, socket);
            case ActionTypes.AUCTION_SUBSCRIBE:
                return validateAuctionSubscribeAction(parsed, socket);
        }
    } catch (err) {
        console.log(err);
        socket.send(JSON.stringify(createResponse("VALIDATION_FAILED",500, "An unexpected error has occurred.")));
        return false;
    }
}
const validateAuctionSubscribeAction = async (parsedAction, socket) => {
    if (!validateFields(parsedAction.data, ["aid"], ["string"])) {
        socket.send(JSON.stringify(createResponse("VALIDATION_FAILED",400, "Invalid AUCTION_SUBSCRIBE AuctionAction format provided.")));
        return false;
    }
    const aid = parsedAction.data.aid;
    const auction = await validateAuction(aid, socket);
    return auction;
}

const validateBidPlaceAction = async (parsedAction, socket) => {
    if (!validateFields(parsedAction.data, ["uid", "aid", "bidAmount"], ["string", "string", "number"])) {
        socket.send(JSON.stringify(createResponse("BID_FAILED",400, "Invalid BID_PLACE AuctionAction format provided.")));
        return false;
    }
    const uid = parsedAction.data.uid;
    const aid = parsedAction.data.aid;
    const bidAmount = parsedAction.data.bidAmount;
    const auction = await validateAuction(aid, socket);
    if (!auction) return false;
    const user = await validateUser(uid, socket);
    if (!user) return false;
    const currentBid = auction.bidHistory.length > 0 ? auction.bidHistory[auction.bidHistory.length - 1].bidAmount : 0;
    //No user
    if (!socket.userId) {
        socket.send(JSON.stringify(createResponse("BID_FAILED",403, "Forbidden: No authenticated user provided in request.")));
        return false;
    }
    //Validate user to make sure the provided uid matches the authenticated user
    if (uid !== socket.userId) {
        socket.send(JSON.stringify(createResponse("BID_FAILED",403, "Forbidden: Authenticated user does not match provided user ID.")));
        return false;
    }
    //Validate bid increment
    if (bidAmount - process.env.AUCTION_MIN_BID_INCREMENT < currentBid) {
        socket.send(JSON.stringify(createResponse("BID_FAILED",400, "Provided bidAmount must be higher.")));
        return false;
    }
    return true;
}

const validateFields = (obj, fields, types) => {
    for (let i=0; i<fields.length; i++) {
        const field = fields[i];
        if (!obj.hasOwnProperty(field) || typeof obj[field] !== types[i]) return false;
    }
    return true;
}

const validateAuction = async (aid, socket) => {
    try {
        if (!mongoose.isValidObjectId(aid)) {
            socket.send(JSON.stringify(createResponse("VALIDATION_FAILED",404, "Auction ID provided is not a valid ObjectID.")));
            return false;
        }
        const event = await Event.findById(aid);
        if (!event) {
            socket.send(JSON.stringify(createResponse("VALIDATION_FAILED",404, "No auction found with the associated ID.")));
            return false;
        } else if (event.eventInfo.status !== "ONGOING") {
            socket.send(JSON.stringify(createResponse("VALIDATION_FAILED",400, "Provided Auction is not currently ongoing.")));
            return false;
        }
        return event;
    } catch (err) {
        console.log(err);
        socket.send(JSON.stringify(createResponse("VALIDATION_FAILED",500, "An unexpected error has occurred.")));
        return false;
    }
}
const validateUser = async (uid, socket) => {
    try {
        if (!mongoose.isValidObjectId(uid)) {
            socket.send(JSON.stringify(createResponse("VALIDATION_FAILED",404, "User ID provided is not a valid ObjectID.")));
            return false;
        }
        const user = await User.findById(uid);
        if (!user) {
            socket.send(JSON.stringify(createResponse("VALIDATION_FAILED",404, "No user found with the associated ID.")));
            return false;
        } else if (!user.isVerified) {
            socket.send(JSON.stringify(createResponse("VALIDATION_FAILED", 400, "User must be verified in order to participate in Auctions.")));
            return false;
        }
        return user;
    } catch (err) {
        console.log(err);
        socket.send(JSON.stringify(createResponse("BID_FAILED",500, "An unexpected error has occurred.")));
        return false;
    }
}

const createResponse = (action, statusCode, message) => {
    return {
        "action": action,
        "data": {
            "statusCode": statusCode,
            "message": message
        }
    }
}

export {validateAuctionAction, createResponse}