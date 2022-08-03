import {validateAuctionAction, createResponse } from "../util/auction/AuctionValidator.js";
import {ActionTypes, queueBid} from "../util/auction/AuctionHandler.js";

const handleIncomingAuctionAction = async (data, socket) => {
    if (!await validateAuctionAction(data, socket)) {
        return;
    }
    const parsed = JSON.parse(data);
    const action = parsed.action;
    switch (action) {
        case ActionTypes.BID_PLACE:
            handleBidPlace(parsed, socket);
    }
}

const handleBidPlace = (data, socket) => {
    const bid = {...data.data, "timeStamp": data.timeStamp};
    if (queueBid(bid)) {
        socket.send(JSON.stringify(createResponse(201, {"message": "Bid has been successfully queued."})));
    } else {
        socket.send(JSON.stringify(createResponse(500, {"message": "An unexpected error has occurred."})));
    }
}

export {handleIncomingAuctionAction}