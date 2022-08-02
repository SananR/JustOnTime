import {WebSocket} from "ws";

export const ActionTypes = Object.freeze({
    "BID_PLACE": "BID_PLACE"
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
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(bid));
            }
        });
    }
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