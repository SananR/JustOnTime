import React from 'react'
import { useNavigate } from 'react-router-dom'
import OrganizerMainEventsList from './eventsList.jsx'
import './main.css'

function OrganizerMain() {
    const navigate = useNavigate()

    return (
        <div>
            <div className="top">
                <h1 id="title"> My Events </h1>
                <button id="createEvent" onClick={() => navigate("/organizer/new")}>New Event</button>
            </div>
            <OrganizerMainEventsList />
        </div>
    );
}

export default OrganizerMain