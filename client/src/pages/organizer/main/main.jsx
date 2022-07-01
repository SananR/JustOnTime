import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './main.css'
import logo from '../../../logo_cropped.png'

function OrganizerMain() {
    const [state, setState] = useState({})
    const navigate = useNavigate()

    useEffect(() => {
        const fetchEvents = async () => {
            setState(await axios.get('/api/event/organizerEvents'));
        }
        fetchEvents();
    }, [])

    return (
        <div>
            <div className="top">
                <h1 id="title"> My Events </h1>
                <button id="createEvent" onClick={() => navigate("/organizer/new")}>New Event</button>
            </div>
            <div className="list">
                {/* uncomment lines below once organizer id is connected to URI */}
                {/* {
                    state.events.map(event =>
                        <button className="event" onClick={() => navigate("/organizer/events/" + event.id)}>
                            <img src={event.eventImage_path} height="200" width="50"></img><br/>
                            {event.name}<br/>
                            {event.time}<br/>
                            {event.address.street}<br/>
                            {event.address.city}<br/>
                            {event.address.country}
                        </button>
                    )
                } */}

                {/* remove once organizer id is connected to URI */}
                <button className="event" onClick={() => navigate("/organizer/events/1")}>
                    <img id="logo" src={logo} alt='JustOnTime' width="200" height="50"/><br/>
                    Event 1<br/>
                    January 1, 2022<br/>
                    6:00 p.m.<br/>
                    123 Main Street<br/>
                    Toronto<br/>
                    Canada
                </button>
            </div>
        </div>
    )
}

export default OrganizerMain