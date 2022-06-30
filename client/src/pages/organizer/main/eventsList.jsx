import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchEvents, selectEvents } from '../../../features/event/eventSlice.js'
import logo from './logo.png'
import { useNavigate } from 'react-router-dom'

function OrganizerMainEventsList() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    dispatch(fetchEvents())
    const eventIds = useSelector(selectEvents)
    const loadingStatus = useSelector((state) => state.events.status)

    // currently the screen is always loading
    if (loadingStatus === 'loading') {
        return (
            <div className="list">
                <button className="event" onClick={() => navigate("/")}>
                    <img src={logo} alt='JustOnTime' width="150" height="100"/><br/>
                    Event 1<br/>
                    January 1, 2022<br/>
                    6:00 p.m.<br/>
                    123 Main Street<br/>
                    Toronto<br/>
                    Canada
                </button>
            </div>
        )

        // line below displays a spinning loader
        // <div class="row justify-content-center">
        //     <div id="loader" class="spinner-border text-primary" role="status"></div>
        // </div>
    }

    if (loadingStatus === 'error') {
        return (
            <div>
                <h>An error occurred while handling the request</h>    
            </div>
        )
    }

    const eventItems = eventIds.map((eventId) => {
        return (
            <button className="event" onClick={() => navigate("/organizer/events/" + {eventId})}>
                {eventId.eventImage_path}<br/>
                {eventId.name}<br/>
                {eventId.time}<br/>
                {eventId.address.street}<br/>
                {eventId.address.city}<br/>
                {eventId.address.country}
            </button>
        )
    })

    return (
            <div className="list">
                {eventItems}
            </div>
    );
}

export default OrganizerMainEventsList