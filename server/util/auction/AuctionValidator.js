import {ActionTypes} from "./AuctionHandler.js";

const validateAuctionAction = (action) => {
    try {
        const parsed = JSON.parse(action);
        return !!(parsed.hasOwnProperty("action") && parsed.hasOwnProperty("timeStamp") && ActionTypes.hasOwnProperty(parsed.action));
    } catch (err) {
        return false;
    }
}

export {validateAuctionAction}