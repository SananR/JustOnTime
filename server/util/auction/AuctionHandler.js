import {WebSocket} from "ws";
import {Event} from "../../models/eventModel.js";
import {wss} from "../../websocket.js";

export const ActionTypes = Object.freeze({
    "BID_PLACE": "BID_PLACE",
    "AUCTION_UPDATE": "AUCTION_UPDATE"
})
const bidQueue = [];
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

//Sends an Auction update to all clients
function sendAuctionUpdate(aid, bidHistory) {
    const update = {
        "action": "AUCTION_UPDATE",
        "aid": aid,
        "bidHistory": [...bidHistory]
    }
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(update));
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

export {startAuctionHandler, stopAuctionHandler, handleNextBid, queueBid}