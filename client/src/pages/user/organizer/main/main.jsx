import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './main.css'
import EventSlider from '../../../../components/event/slider/EventSlider'
import Carousel from "react-multi-carousel"
import EventCard from "../../../../components/event/card/EventCard"

function OrganizerMain() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const user = useSelector((state) => state.auth.user);
    const userID = useSelector((state) => state.auth.user._id);
    
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            var events = [];

            const response = await axios.get('/api/event/organizerEvents?id=' + userID);
            for(let i=0; i < response.data.events.length; i++){
                events = response.data.events;
                console.log(events);
            }
            setEvents(events);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        setLoading(true);
        fetchEvents();
        setLoading(false);
    }, [userID])

    const filterEvents = (status) => {
        return events.filter(event => event.status === status)
    } 

    const eventsList = (
        <div>
            <div className="my-5 me-5 d-flex justify-content-between">
                    <h1 id="title" className='col-sm-6'> My Events </h1>
                    <button id="createEvent" className='col-sm-6' onClick={() => navigate("/organizer/createEvent")}>New Event</button>
            </div>
           
           {filterEvents("ONGOING").length > 0 && <div className="list">
                 <h3 id="title"> Current Events </h3>
                 <EventSlider events={filterEvents("ONGOING")} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            </div>}

            {filterEvents("NEEDS_RESUBMISSION") > 0 && <div className="list">
             <h3 id="title"> Resubmit Events </h3>
             <EventSlider events={filterEvents("NEEDS_RESUBMISSION")} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            </div>}

            {filterEvents("UNDER_REVIEW").length > 0 && <div className="list">
             <h3 id="title"> Pending Events </h3>
             <EventSlider events={filterEvents("UNDER_REVIEW")} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            </div>}

           {filterEvents("COMPLETED").length > 0 && <div className="list">
            <h3 id="title"> Completed Events </h3>
            <EventSlider events={filterEvents("COMPLETED")} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            </div> 
            }

          {filterEvents("CANCELED").length > 0 &&  <div className="list">
            <h3 id="title"> Canceled Events </h3>
            <EventSlider events={filterEvents("CANCELED")} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            </div>}

        </div>
    )

    const loadingscreen =  (
        <div>

            <div className="row justify-content-center">
                <div id="loader" className="spinner-border text-primary" role="status"></div>
            </div>
        </div>
    ) 

    const noEvents =  (
        <div>
            <div className="top">
                <h1 id="title"> My Events </h1>
                <button id="createEvent" onClick={() => navigate("/organizer/createEvent")}>New Event</button>
            </div>
                <p className="d-flex flex-column text-center justify-content-start mt-5 mb-5 position-relative container h-100 p-5"><strong> You have no events.</strong></p>
        </div>
    )
    
    const pageDNE =  (
        <div>
             <p className="d-flex flex-column text-center justify-content-start mt-5 mb-5 position-relative shadow-lg container h-100 p-5"><strong> This page does not exist.</strong></p>
        </div>
    )


    return(
        (user.userType === "Customer") ? pageDNE : (loading) ? loadingscreen : (events.length > 0) ? eventsList : noEvents
    )

}

export default OrganizerMain
