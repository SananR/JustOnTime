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
        socket.send(JSON.stringify(createResponse(400, {"message": "Invalid AuctionAction format provided."})));
        return false;
    }
    try {
        //Has common AuctionAction data
        if (!validateFields(parsed, ["action", "timeStamp", "data"], ["string", "number", "object"]) || !ActionTypes.hasOwnProperty(parsed.action)) {
            socket.send(JSON.stringify(createResponse(400, {"message": "Invalid AuctionAction format provided."})));
            return false;
        }
        const action = parsed.action;
        switch (action) {
            case ActionTypes.BID_PLACE:
                return validateBidPlaceAction(parsed, socket);
        }
    } catch (err) {
        console.log(err);
        socket.send(JSON.stringify(createResponse(500, {"message": "An unexpected error has occurred."})));
        return false;
    }
}
const validateBidPlaceAction = async (parsedAction, socket) => {
    if (!validateFields(parsedAction.data, ["uid", "aid", "bidAmount"], ["string", "string", "number"])) {
        socket.send(JSON.stringify(createResponse(400, {"message": "Invalid BID_PLACE AuctionAction format provided."})));
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
    //Validate user to make sure the provided uid matches the authenticated user
    if (uid !== socket.userId) {
        socket.send(JSON.stringify(createResponse(403, {"message": "Forbidden: Authenticated user does not match provided user ID."})));
        return false;
    }
    //Validate bid increment
    if (bidAmount - process.env.AUCTION_MIN_BID_INCREMENT < currentBid) {
        socket.send(JSON.stringify(createResponse(400, {"message": "Provided bidAmount must be higher."})));
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
            socket.send(JSON.stringify(createResponse(404, {"message": "Auction ID provided is not a valid ObjectID."})));
            return false;
        }
        const event = await Event.findById(aid);
        if (!event) {
            socket.send(JSON.stringify(createResponse(404, {"message": "No auction found with the associated ID."})));
            return false;
        } else if (event.eventInfo.status !== "Ongoing") {
            socket.send(JSON.stringify(createResponse(400, {"message": "Provided Auction is not currently ongoing."})));
            return false;
        }
        return event;
    } catch (err) {
        console.log(err);
        socket.send(JSON.stringify(createResponse(500, {"message": "An unexpected error has occurred."})));
        return false;
    }
}
const validateUser = async (uid, socket) => {
    try {
        if (!mongoose.isValidObjectId(uid)) {
            socket.send(JSON.stringify(createResponse(404, {"message": "User ID provided is not a valid ObjectID."})));
            return false;
        }
        const user = await User.findById(uid);
        if (!user) {
            socket.send(JSON.stringify(createResponse(404, {"message": "No user found with the associated ID."})));
            return false;
        } else if (!user.isVerified) {
            socket.send(JSON.stringify(createResponse(400, {"message": "User must be verified in order to participate in Auctions."})));
            return false;
        }
        return user;
    } catch (err) {
        console.log(err);
        socket.send(JSON.stringify(createResponse(500, {"message": "An unexpected error has occurred."})));
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