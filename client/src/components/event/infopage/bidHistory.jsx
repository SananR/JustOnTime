import React from "react";

import Carousel from "react-multi-carousel"
import './imageCarousel.css'
function BidHistoryPanel(props) {

    
    function createBidHistory() {
        return props.bids.sort((prev, curr) => {
            return (prev.bidPrice > curr.bidPrice) ? -1 : 1
        }).map(bid => {
            return (
                <div className="my-1">
                    A user made a bid of ${bid.bidPrice} at {bid.date}
                </div>
            )
        })
    }

    return (
        <div>
            <div className="text-secondary mt-5 mb-3">BidHistory</div>
            {createBidHistory()}
        </div>
    )
}

export default BidHistoryPanel