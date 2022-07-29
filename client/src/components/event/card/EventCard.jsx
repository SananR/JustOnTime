import React, {useEffect, useState} from "react";

import {AiOutlineStar, AiFillStar} from "react-icons/ai"

import "./eventcard.css"
import { useSelector, useDispatch } from 'react-redux';
import { getEventImage } from "../../../services/event/eventService";
import { updateUser } from '../../../services/auth/authSlice.js';

function EventCard(props) {

    const [image, setImage] = useState("");
    const [starredState, setStarredState] = useState(false);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    useEffect( () => {
        const fetchImage = async() => {
            const img = await getEventImage(props.id);
            setImage(() => (img));
        }
        fetchImage().catch(console.error);
    }, [props.id]);

    useEffect( () => {
        if (user.starredEvents.includes(props.id))
            setStarredState(true);
        else
            setStarredState(false);
    }, [user, props.id]);

    const handleStar = (async (e, event) => {
        try {
            e.stopPropagation();
            const userId = user._id;
            const eventId = event.id;
            var eventsList = [...user.starredEvents];
            if (eventsList.includes(eventId))
                eventsList.splice(eventsList.indexOf(eventId), 1);
            else
                eventsList.push(eventId);
            dispatch(updateUser({"update": {"starredEvents": eventsList}, "id": userId}));
        } catch (e) {
            console.log(e);
        }
    });

    return (
        <div className="event-card position-relative d-flex g-0 flex-column justify-content-center align-items-center mt-5 mb-5 shadow-sm container-fluid">
            <div className="event-image-container w-100 bg-image " style={{ backgroundImage: `url(${URL.createObjectURL(new Blob([image], {type:"image/jpeg"}))})` }}></div>
            <div className="event-content-container w-100 gap-0 g-0 d-flex flex-column justify-content-center align-items-start">
                <h1 className="event-card-title w-100 mt-3 ps-3 ">{props.title}</h1>
                <h2 className="event-card-meta w-100 ps-3 text-muted">{props.date} • {props.time} • {props.location}</h2>
                <div className="w-100 mt-1 d-flex justify-content-start align-items-center">
                    <h2 className="event-card-bid h-auto ps-3">${props.currentBid}</h2>
                    <h2 className="event-card-prevbid h-auto ps-3">${props.previousBid}</h2>
                </div>
            </div>
            <BidTimeTag timeRemaining={props.timeRemaining}/>
            {!starredState && <AiOutlineStar className="event-card-star position-absolute end-0 top-0 me-2 mt-2" size={40} color={"white"} onClick={(e) => handleStar(e, props)}/>}
            {starredState && <AiFillStar className="event-card-star position-absolute end-0 top-0 me-2 mt-2" size={40} color={"gold"} onClick={(e) => handleStar(e, props)}/>}
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