import React, {useEffect, useState, forwardRef} from "react";
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom";

import {AiOutlineStar, AiFillStar} from "react-icons/ai";

import "./eventcard.css"

import { getEventImage } from "../../../services/event/eventService";
import { updateUser } from '../../../services/auth/authSlice.js';

const EventCard = forwardRef((props, ref) => {

    const [image, setImage] = useState("");
    const [url, setUrl] = useState();
    const [starredState, setStarredState] = useState(false);
    const [done, setDone] = useState(false);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    useEffect( () => {
        const fetchImage = async() => {
            const img = await getEventImage(props.id);
            setDone(true);
            setImage(() => (img));
        }
        fetchImage().catch(console.error);
        setUrl({ backgroundImage: `url(${URL.createObjectURL(new Blob([image], {type:"image/jpeg"}))})` });
    }, [done, image, props.id]);

    useEffect( () => {
        if (user !== null) {
            if (user.starredEvents.includes(props.id))
                setStarredState(true);
            else
                setStarredState(false);
        }
    }, [user, props.id]);

    const handleClick = () => {
        navigate(`/event/${props.id}`);
    }

    const handleStar = (async (e, event) => {
        try {
            e.stopPropagation();
            const userId = user._id;
            const eventId = event.id;
            let eventsList = [...user.starredEvents];
            if (eventsList.includes(eventId))
                eventsList.splice(eventsList.indexOf(eventId), 1);
            else
                eventsList.push(eventId);
            dispatch(updateUser({"update": {"starredEvents": eventsList}, "id": userId}));
            
            // when the event card's star button is clicked, the following code immediately shows the updated star image along with a conditional
            // particle animation for the current event card while the other event cards corresponding to the same event are being updated
            if (eventsList.includes(eventId)) {
                setStarredState(true);
                ref.current.plugins.get("emitters").array[0].play()
            }
            else {
                setStarredState(false);
                ref.current.plugins.get("emitters").array[0].pause()
            }
        } catch (e) {
            console.log(e);
        }
    });

    const getCurrentBid = () => {
        return props.bidHistory.length > 0 ? props.bidHistory[props.bidHistory.length - 1].bidAmount : 0;
    }
    const getPreviousBid = () => {
        return props.bidHistory.length > 1 ? props.bidHistory[props.bidHistory.length - 2].bidAmount : 0;
    }

    return (
        <div onClick={handleClick} className="event-card position-relative d-flex g-0 flex-column justify-content-center align-items-center mt-5 mb-5 shadow-sm container-fluid">
            <div className="event-image-container w-100 bg-image " style={url}></div>
            <div className="event-content-container w-100 gap-0 g-0 d-flex flex-column justify-content-center align-items-start">
                <h1 className="event-card-title w-100 mt-3 ps-3 "><a href={props.url}>{props.title}</a></h1>
                <h2 className="event-card-meta w-100 ps-3 text-muted">{props.date} • {props.time} • {props.location}</h2>
                <div className="w-100 mt-1 d-flex justify-content-start align-items-center">
                    <h2 className="event-card-bid h-auto ps-3">${getCurrentBid()}</h2>
                    <h2 className="event-card-prevbid h-auto ps-3">${getPreviousBid()}</h2>
                </div>
            </div>
            <BidTimeTag timeRemaining={props.timeRemaining}/>
            {(user !== null) && !starredState && <AiOutlineStar className="event-card-star position-absolute end-0 top-0 me-2 mt-2" size={40} color={"white"} onClick={(e) => {e.stopPropagation(); handleStar(e, props)}}/>}
            {(user !== null) && starredState && <AiFillStar className="event-card-star position-absolute end-0 top-0 me-2 mt-2" size={40} color={"gold"} onClick={(e) => {e.stopPropagation(); handleStar(e, props)}}/>}
        </div>
    );
})

function BidTimeTag(props) {
    return (
        <div className="bid-time-container end-0 me-2 position-absolute container-fluid d-flex justify-content-center align-items-center">
            <p className="bid-time-text position-relative w-100 text-center">{props.timeRemaining}</p>
        </div>
    )
}

export default EventCard