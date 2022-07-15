import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux';
import axios from 'axios'
import { getEventImage } from "../../../services/event/eventService";
import './main.css'
<<<<<<< HEAD:client/src/pages/organizer/main/main.jsx
=======
import logo from '../../../../logo_cropped.png'
>>>>>>> dev:client/src/pages/user/organizer/main/main.jsx

function OrganizerMain() {
    const [eventState, setEventState] = useState({})
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const userId = useSelector(state => state.auth.user._id)
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
                await axios.get('/api/event/organizerEvents', {params: {"id": userId}}).then(function(res) {
                    res = res.data;
                    for (let index = 0; index < res.events.length; index++)
                        res.events[index]["blob"] = getEventImage(res.events[index].id)
                    setEventState(res);
                }
                );
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        })
        fetchData();
    }, [userId])

    if (error) {
        return (
            <div>
                <Heading/>
                <p id="error">An error occurred while trying to load the events</p>
            </div>
    )
    } else if (loading) { 
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
                            <img id="image" src={URL.createObjectURL(new Blob([event.blob], {type:"image/jpeg"}))} alt={event.name}></img><br/>
                            {event.name}<br/>
                            {event.hasOwnProperty('address') && event.address.hasOwnProperty('street') && event.address.street}<br/>
                            {event.hasOwnProperty('address') && event.address.hasOwnProperty('city') && event.address.city}<br/>
                            {event.hasOwnProperty('address') && event.address.hasOwnProperty('country') && event.address.country}
                        </button>
                    )
                }
            </div>
        </div>
        )
    }
}

export default OrganizerMain