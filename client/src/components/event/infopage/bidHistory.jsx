import React, {useState, useEffect} from "react";
import './imageCarousel.css'

function BidHistoryPanel(props) {

    function createBidHistory() {
        return props.bids.slice().reverse().map(bid => {
            return (
                <div className="my-1">
                    A user made a bid of ${bid.bidAmount} on {new Date(bid.timeStamp).toLocaleDateString()} at {new Date(bid.timeStamp).toLocaleTimeString()}
                </div>
            )
        })
    }

    return (
        <div>
            <div className="text-secondary mt-5 mb-3">Bid History</div>
            {createBidHistory()}
        </div>
    )
}

export default BidHistoryPanel