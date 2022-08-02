import app from './app.js';
import mongoose from 'mongoose';
import {startAuctionHandler} from "./util/auction/AuctionHandler.js";
import init, {wss} from "./websocket.js";

const port = process.env.PORT || 3000;
const uri = process.env.JUSTONTIME_DB_URI_LOCAL; //process.env.JUSTONTIME_DB_URI (use this on production)

await mongoose.connect(uri)
.catch(err => {
    console.error(err.stack)
    process.exit(1)
})
.then(async client => {
    console.log('connected to mongoDB '+uri);
    const server = app.listen(port, () => {
        console.log('listening on port '+port)
    })
    //Initialize websocket server
    init(server);
    //Start up the AuctionHandler
    startAuctionHandler(wss, process.env.AUCTION_HANDLER_INTERVAL);
});