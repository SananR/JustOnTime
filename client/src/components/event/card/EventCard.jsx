import React from "react";

import {AiOutlineStar, AiFillStar} from "react-icons/ai"

import "./eventcard.css"

function EventCard(props) {
    return (
        <div className="event-card position-relative d-flex g-0 flex-column justify-content-center align-items-center mt-5 mb-5 shadow-sm container-fluid">
            <div className="event-image-container w-100 bg-image " style={{ backgroundImage: `url(${props.image})` }}></div>
            <div className="event-content-container w-100 gap-0 g-0 d-flex flex-column justify-content-center align-items-start">
                <h1 className="event-card-title w-100 mt-3 ps-3 ">{props.title}</h1>
                <h2 className="event-card-meta w-100 ps-3 text-muted">{props.date} • {props.time} • {props.location}</h2>
                <div className="w-100 mt-1 d-flex justify-content-start align-items-center">
                    <h2 className="event-card-bid h-auto ps-3">${props.currentBid}</h2>
                    <h2 className="event-card-prevbid h-auto ps-3">${props.previousBid}</h2>
                </div>
            </div>
            <BidTimeTag timeRemaining={props.timeRemaining}/>
            {!props.starred && <AiOutlineStar className="event-card-star position-absolute end-0 top-0 me-2 mt-2" size={40} color={"white"}/>}
            {props.starred && <AiFillStar className="event-card-star position-absolute end-0 top-0 me-2 mt-2" size={40} color={"gold"}/>}
        </div>
    );
}

function BidTimeTag(props) {
    return (
        <div className="bid-time-container end-0 me-2 position-absolute container-fluid d-flex justify-content-center align-items-center">
            <p className="bid-time-text position-relative w-100 text-center">{props.timeRemaining}</p>
        </div>
    )
}

export default EventCard