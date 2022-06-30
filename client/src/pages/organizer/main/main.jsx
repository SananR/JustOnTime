import React from 'react'
import OrganizerMainEventsList from './eventsList.jsx'
import './main.css'

function OrganizerMain() {

    return (
        <div>
            <div className="top">
                <h1 id="title"> My Events </h1>
                <button id="createEvent">New Event</button>
            </div>
            <OrganizerMainEventsList />
        </div>
    );
}

export default OrganizerMain