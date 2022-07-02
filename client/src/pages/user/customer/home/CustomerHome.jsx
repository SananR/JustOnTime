import React, {useEffect, useState} from 'react'

import cardBackground from "../../../../card-bg.jpg"
import cardBackground2 from "../../../../card-bg2.jpg"
import cardBackground3 from "../../../../card-bg3.jpg"

import "./customerhome.css"
import EventSlider from "../../../../components/event/slider/EventSlider";
import TopEventCarousel from "../../../../components/event/topcarousel/TopEventCarousel";
import { loadEvents } from "../../../../services/event/eventService";

function CustomerHome() {

    const [events, setEvents] = useState([]);

    useEffect( () => {
        const fetchEvents = async() => {
            const events = await loadEvents();
            setEvents(() => (events));
        }
        fetchEvents().catch(console.error);
    }, []);

    return (
        <div className="container-fluid w-100 h-100">
            <TopEventCarousel
                events={events}
            />
            <h2 className="slider-heading mt-2 ms-3 mt-5">Explore Toronto</h2>
            <EventSlider events={events} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            <h2 className="slider-heading mt-2 ms-3 mt-5">Under $100</h2>
            <EventSlider events={events} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            <h2 className="slider-heading mt-2 ms-3 mt-5">Closest to you</h2>
            <EventSlider events={events} className="container-fluid row w-100 h-100 gap-0 gx-0" />
        </div>
    )
}

export default CustomerHome