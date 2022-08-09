import {Event} from "../../models/eventModel.js";
import {clients} from "../../websocket.js";

export const ActionTypes = Object.freeze({
    "BID_PLACE": "BID_PLACE",
    "AUCTION_SUBSCRIBE": "AUCTION_SUBSCRIBE",
    "AUCTION_UNSUBSCRIBE": "AUCTION_UNSUBSCRIBE",
    "AUCTION_UPDATE": "AUCTION_UPDATE"
})
const bidQueue = [];
//Mapping event id to list of connection ids (for updates)
let subscribed = {};
let interval = null;

//Starts the AuctionHandler interval
function startAuctionHandler(interval) {
    console.log("Starting AuctionHandler...");
    interval = setInterval(handleNextBid, interval);
}

//Stops the AuctionHandler and performs any necessary cleanup
function stopAuctionHandler() {
    console.log("Stopping AuctionHandler...");
    clearInterval(this.interval);
}

//Handles the next bid in the queue
async function handleNextBid() {
    if (bidQueue.length > 0) {
        const bid = bidQueue.shift();
        //Override the timestamp to current
        bid.timeStamp = Date.now();
        //Handle the bid
        const bidHistory = await handleBid(bid);
        //Send update to all clients
        sendAuctionUpdate(bid.aid, bidHistory);
        //Send success notification to bidder
        sendBidSuccess(bid.uid);
    }
}

//Handle a bid
async function handleBid(bid) {
    const bidObj = {
        uid: bid.uid,
        bidAmount: bid.bidAmount,
        timeStamp: bid.timeStamp
    };
    const update = {$push: {bidHistory: bidObj}}
    let event = await Event.findByIdAndUpdate(bid.aid, update, {new: true});
    return event.bidHistory;
}

function subscribeToEvent(aid, connectionId) {
    if (!subscribed.hasOwnProperty(aid)) {
        subscribed[aid] = [connectionId];
    }
    else subscribed[aid] = [...subscribed[aid], connectionId];
    return true;
}

function unsubscribeAll(connectionId) {
    for (const aid in subscribed) {
        if (connectionId in subscribed[aid]) {
            subscribed[aid] = subscribed[aid].filter(id => id !== connectionId);
        }
    }
    return true;
}

function sendBidSuccess(uid) {
    const success = {
        "action": "BID_SUCCESS",
        "uid": uid
    }
    clients.forEach(function each(client) {
        if (client.userId === uid) {
            client.socket.send(JSON.stringify(success));
        }
    });
}

//Sends an Auction update to all clients
function sendAuctionUpdate(aid, bidHistory) {
    if (!subscribed.hasOwnProperty(aid)) return;
    const update = {
        "action": "AUCTION_UPDATE",
        "aid": aid,
        "bidHistory": [...bidHistory]
    }
    clients.forEach(function each(client) {
       if (subscribed[aid].indexOf(client.connectionId) !== -1) {
           client.socket.send(JSON.stringify(update));
       }
    });
}


//Adds a bid to the queue
function queueBid(bid) {
    try {
        bidQueue.push(bid);
        return true;
    }catch(err) {
        console.log(err);
        return false;
    }
}

export {startAuctionHandler, stopAuctionHandler, handleNextBid, queueBid, subscribeToEvent, unsubscribeAll}