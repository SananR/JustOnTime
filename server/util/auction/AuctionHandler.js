import {WebSocket} from "ws";
import {Event} from "../../models/eventModel.js";

export const ActionTypes = Object.freeze({
    "BID_PLACE": "BID_PLACE",
    "AUCTION_UPDATE": "AUCTION_UPDATE"
})
const bidQueue = [];
let interval = null;
let wss = null;

//Starts the AuctionHandler interval
function startAuctionHandler(websocketServer, interval) {
    console.log("Starting AuctionHandler...");
    interval = setInterval(handleNextBid, interval);
    wss = websocketServer;
}

//Stops the AuctionHandler and performs any necessary cleanup
function stopAuctionHandler() {
    console.log("Stopping AuctionHandler...");
    clearInterval(this.interval);
}

//Handles the next bid in the queue
function handleNextBid() {
    if (bidQueue.length > 0) {
        const bid = bidQueue.shift();
        //Override the timestamp to current
        bid.timeStamp = Date.now();
        //Handle the bid
        handleBid(bid);
        //Send update to all clients
        sendAuctionUpdate(bid);
    }
}

//Handle a bid
function handleBid(bid) {
    const bidObj = {
        uid: bid.uid,
        bidAmount: bid.bidAmount,
        timeStamp: bid.timeStamp
    };
    const update = {$push: {bidHistory: bidObj}}
    Event.findByIdAndUpdate(bid.aid, update,  async (err, event) => {
        if (err) {
            console.log(err);
        }
    });
}

//Sends an Auction update to all clients
function sendAuctionUpdate(bid) {
    const update = {
        "action": "AUCTION_UPDATE",
        "data": {
            "uid": bid.uid,
            "aid": bid.aid,
            "bidAmount": bid.bidAmount,
            "timeStamp": bid.timeStamp
        }
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