import {validateAuctionAction, createResponse } from "../util/auction/AuctionValidator.js";
import {ActionTypes, queueBid, subscribeToEvent} from "../util/auction/AuctionHandler.js";

const handleIncomingAuctionAction = async (data, socket) => {
    if (!await validateAuctionAction(data, socket)) {
        return;
    }
    const parsed = JSON.parse(data);
    const action = parsed.action;
    switch (action) {
        case ActionTypes.BID_PLACE:
            handleBidPlace(parsed, socket);
            return;
        case ActionTypes.AUCTION_SUBSCRIBE:
            handleAuctionSubscribe(parsed, socket);
    }
}

const handleAuctionSubscribe = (data, socket) => {
    const aid = data.data.aid;
    if (subscribeToEvent(aid, socket.connectionId)) {
        socket.send(JSON.stringify(createResponse("SUBSCRIBED",201, "Subscribed to Auction to receive all updates.")));
    } else {
        socket.send(JSON.stringify(createResponse("SUBSCRIBE_FAILED", 500, "An unexpected error has occurred.")));
    }
}

const handleBidPlace = (data, socket) => {
    const bid = {...data.data, "timeStamp": data.timeStamp};
    if (queueBid(bid)) {
        socket.send(JSON.stringify(createResponse("BID_QUEUE",201, "Bid has been successfully queued.")));
    } else {
        socket.send(JSON.stringify(createResponse("BID_FAILED",500, "An unexpected error has occurred.")));
    }
}

export {handleIncomingAuctionAction}