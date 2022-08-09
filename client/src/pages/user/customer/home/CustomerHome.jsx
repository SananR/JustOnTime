import React, {useEffect, useState} from 'react'
import { useSelector} from 'react-redux';
import cardBackground from "../../../../card-bg.jpg"
import cardBackground2 from "../../../../card-bg2.jpg"
import cardBackground3 from "../../../../card-bg3.jpg"

import "./customerhome.css"
import EventSlider from "../../../../components/event/slider/EventSlider";
import TopEventCarousel from "../../../../components/event/topcarousel/TopEventCarousel";
import { loadEvents } from "../../../../services/event/eventService";
import {useNavigate} from "react-router-dom";
import moment from "moment";

function CustomerHome() {

    const [events, setEvents] = useState([]);
    const [timeRemaining, setTimeRemaining] = useState({});
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    useEffect( () => {
        const fetchEvents = async() => {
            const events = await loadEvents();
            setEvents(() => (events));
        }
        fetchEvents().catch(console.error);
    }, []);

    useEffect(() => {
        if (events.length > 0) {
            const interval = setInterval(() => {
                events.forEach((event) => {
                    setTimeRemaining((prevState) => ({
                        ...prevState,
                        [event.id]: getTimeRemaining(event.id)
                    }));
                })
            }, 1000);
            console.log(timeRemaining);
            return () => clearInterval(interval);
        }
    }, [events])


    const formatTime = (secs) => {
        let sec_num = parseInt(secs, 10)
        let hours   = Math.floor(sec_num / 3600)
        let minutes = Math.floor(sec_num / 60) % 60
        let seconds = sec_num % 60

        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
    }

    const getTimeRemaining = (aid) => {
        const event = events.filter(event => {
            return event.id === aid;
        }).pop();
        const seconds = moment.duration(moment(event.auctionEnd).diff(moment())).asSeconds()
        return seconds > 0 ? formatTime(Math.abs(seconds)) : "00:00:00";
    }

    return (
        <div className="container-fluid w-100 h-100">
            <TopEventCarousel
                events={events}
            />
            <h2 className="slider-heading mt-2 ms-3 mt-5">Explore Toronto</h2>
            <EventSlider events={events} timeRemaining={timeRemaining} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            <h2 className="slider-heading mt-2 ms-3 mt-5">Under $100</h2>
            <EventSlider events={events} timeRemaining={timeRemaining} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            <h2 className="slider-heading mt-2 ms-3 mt-5">Closest to you</h2>
            <EventSlider events={events} timeRemaining={timeRemaining} className="container-fluid row w-100 h-100 gap-0 gx-0" />
        </div>
    )
}

export default CustomerHome