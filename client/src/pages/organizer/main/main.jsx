import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './main.css'
import logo from '../../../logo_cropped.png'

function OrganizerMain() {
    const [eventState, setEventState] = useState({})
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const Heading = () => {
        return (
            <div className="top">
                <h1 id="title"> My Events </h1>
                <button id="createEvent" onClick={() => navigate("/organizer/new")}>New Event</button>
            </div>
        )
    }

    useEffect(() => {
        const fetchData = (async () => {
            try {
                // gets all events for now, add a request body with the organizer's id for only the single organizer's events
                const res = await axios.get('/api/event/organizerEvents').then(res => res.data);
                setEventState(res);
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        })
        fetchData();
    }, [])

    if (error) {
        return (
            <div>
                <Heading/>
                <p id="error">An error occurred while trying to load the events</p>
            </div>
    )} else if (loading) { 
        return (
            <div>
                <Heading/>
                <div className="row justify-content-center">
                    <div id="loader" className="spinner-border text-primary" role="status"></div>
                </div>
            </div>
        ) 
    } else {
        return (
        <div>
            <Heading/>
            <div className="list">
                {
                    eventState.events.map(event =>
                        <button className="event" onClick={() => navigate("/organizer/events/" + event.name)}>
                            <img src={event.eventImagePath} alt={event.name}></img><br/>
                            {event.name}<br/>
                            {event.hasOwnProperty('address') && event.address.hasOwnProperty('street') && event.address.street}<br/>
                            {event.hasOwnProperty('address') && event.address.hasOwnProperty('city') && event.address.city}<br/>
                            {event.hasOwnProperty('address') && event.address.hasOwnProperty('country') && event.address.country}
                        </button>
                    )
                }

                {/* Remove when events are obtained from the database */}
                <button className="event" onClick={() => navigate("/organizer/events/Default%Event")}>
                    <img id="logo" src={logo} alt='JustOnTime' width="200" height="50"/><br/>
                    Default Event<br/>
                    123 Main Street<br/>
                    Toronto<br/>
                    Canada
                </button>
            </div>
        </div>
        )
    }
}

export default OrganizerMain