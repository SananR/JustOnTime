import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import './main.module.css'
import EventSlider from '../../../../components/event/slider/EventSlider'
import { loadOrganizerEvents } from '../../../../services/event/eventService'

function OrganizerMain() {
    const router = useRouter();
    const [loading, setLoading] = useState(true)
    const user = useSelector((state) => state.auth.user);
    const userID = useSelector((state) => state.auth.user._id);
    
    const [events, setEvents] = useState([]);

    const fetchEvents = async () => {
        try {
            const events = await loadOrganizerEvents(userID);
            setEvents(events);
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        if(user && user.userType == "Customer"){
            router.push("/")
        }
        setLoading(true);
        fetchEvents().then((e) => {
            if (e){
                console.log(e);
            }
            setLoading(false);
        })
        
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

            {filterEvents("NEEDS_RESUBMISSION") > 0 && <div className="list unclickable">
             <h3 id="title"> Resubmit Events </h3>
             <EventSlider events={filterEvents("NEEDS_RESUBMISSION")} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            </div>}

            {filterEvents("UNDER_REVIEW").length > 0 && <div className="list unclickable">
             <h3 id="title"> Pending Events </h3>
             <EventSlider events={filterEvents("UNDER_REVIEW")} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            </div>}

           {filterEvents("COMPLETED").length > 0 && <div className="list unclickable">
            <h3 id="title"> Completed Events </h3>
            <EventSlider events={filterEvents("COMPLETED")} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            </div> 
            }

          {filterEvents("CANCELED").length > 0 &&  <div className="list unclickable">
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
            <div className="my-5 me-5 d-flex justify-content-between">
                    <h1 id="title" className='col-sm-6'> My Events </h1>
                    <button id="createEvent" className='col-sm-6' onClick={() => navigate("/organizer/createEvent")}>New Event</button>
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
        // eventsList
        (user.userType === "Customer") ? pageDNE : (loading) ? loadingscreen : (events.length > 0) ? eventsList : noEvents
    )

}

export default OrganizerMain
