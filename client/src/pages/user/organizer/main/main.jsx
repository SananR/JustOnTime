import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './main.css'
import Carousel from "react-multi-carousel"

function OrganizerMain() {
    const [currEvents, setCurrEvents] = useState([]);
    const [subEvents, setSubEvents] = useState([]);
    const [revEvents, setRevEvents] = useState([]);
    const [compEvents, setCompEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [count, setCount] = useState(0); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const userID = useSelector((state) => state.auth.user._id);
    
    const fetchEvents = async () => {
        try {
            const curr = [];
            const sub = []; 
            const rev = []; 
            const past = []; 
            const comp = []; 
            const response = await axios.get('/api/event/organizerEvents?id=' + userID);
            for(let i=0; i < response.data.events.length; i++){
                if(response.data.events[i].status === "ONGOING"){
                    curr.push(response.data.events[i])
                } else if(response.data.events[i].status === "COMPLETED"  ){
                    comp.push(response.data.events[i])
                } else if(response.data.events[i].status === "NEEDS_RESUBMISSION"){
                    sub.push(response.data.events[i])
                } else if(response.data.events[i].status === "UNDER_REVIEW" ){
                    rev.push(response.data.events[i])
                } else {
                    past.push(response.data.events[i])
                }
            }
            setCurrEvents(curr); 
            setSubEvents(sub); 
            setPastEvents(past); 
            setRevEvents(rev); 
            setCompEvents(comp); 
            setCount(response.data.count);
            return response.data;
        } catch (e) {
            console.log(e);
        }
    }
    useEffect(() => {
        fetchEvents();
    }, [userID])

    useEffect(() => {
        if(currEvents.length > 0 || pastEvents.length > 0 || revEvents.length > 0 || subEvents.length > 0 || compEvents.length > 0  ){
            setLoading(false); 
        }
    }, [currEvents, pastEvents, revEvents, subEvents, compEvents])


    const createCurrEvents = (
        currEvents.map(event =>
            <div className="event">
                 <a href={"/organizer/events/" + event.id} > <span id="name">{event.name}<br/></span>  </a>
                <div id="eventInfo"> 
                {event.eventImage_path}<br/>
                Time: {event.time}<br/>
                Date: {event.date}<br/>
                Address: {event.address.street}, {event.address.city}, {event.address.country}<br/>
            </div>
       </div>
        )
    ) 

    const createRevEvents = (
        revEvents.map(event =>
            <div className="event">
                <a href={"/organizer/events/" + event.id} > <span id="name">{event.name}<br/></span>  </a>
                <div id="eventInfo"> {event.eventImage_path}<br/>
                Time: {event.time}<br/>
                Date: {event.date}<br/>
                Address: {event.address.street}, {event.address.city}, {event.address.country}<br/>
                </div>
            </div>
        )
    ) 

    const createSubEvents = (
        subEvents.map(event =>
           <div className="event">
                <a href={"/organizer/events/" + event.id} > <span id="name">{event.name}<br/></span>  </a>
                <div id="eventInfo"> {event.eventImage_path}<br/>
                Time: {event.time}<br/>
                Date: {event.date}<br/>
                Address: {event.address.street}, {event.address.city}, {event.address.country}<br/>
                </div>
           </div>
        )
    ) 


    const createPastEvents = (
        pastEvents.map(event =>
            <div className="event">
                 <a href={"/organizer/events/" + event.id} > <span id="name">{event.name}<br/></span>  </a>
                <div id="eventInfo"> {event.eventImage_path}<br/>
                Time: {event.time}<br/>
                Date: {event.date}<br/>
                Address: {event.address.street}, {event.address.city}, {event.address.country}<br/>
                Status: {event.status}<br/>
                </div>
           </div>
        )
    ) 

    const createCompEvents = (
        compEvents.map(event =>
            <div className="event">
                 <a href={"/organizer/events/" + event.id} > <span id="name">{event.name}<br/></span>  </a>
                <div id="eventInfo"> {event.eventImage_path}<br/>
                Time: {event.time}<br/>
                Date: {event.date}<br/>
                Address: {event.address.street}, {event.address.city}, {event.address.country}<br/>
                Status: {event.status}<br/>
                </div>
           </div>
        )
    ) 


    const responsive = {
        bigdesktop: {
            breakpoint: { max: 3000, min: 1800 },
            items: 5,
            slidesToSlide: 5,
        },
        desktop: {
            breakpoint: { max: 1800, min: 1300 },
            items: 4,
            slidesToSlide: 4,
            partialVisibilityGutter: 10
        },
        laptop: {
            breakpoint: { max: 1300, min: 464 },
            items: 3,
            partialVisibilityGutter: 20
        },
        tablet: {
            breakpoint: { max: 1090, min: 900 },
            items: 2,
            partialVisibilityGutter: 100
        },
        tablet2: {
            breakpoint: { max: 900, min: 800 },
            items: 2,
            partialVisibilityGutter: 50
        },
        tablet3: {
            breakpoint: { max: 800, min: 710 },
            items: 2,
            partialVisibilityGutter: 10
        },
        mobile: {
            breakpoint: { max: 710, min: 0 },
            items: 1,
            partialVisibilityGutter: 200
        }
    };


    const eventsList = (
        <div>
            <div className="top">
                <h1 id="title"> My Events </h1>
                <button id="createEvent" onClick={() => navigate("/organizer/new")}>New Event</button>
            </div>
           
            <div className="list">
                 <h3 id="title"> Current Events </h3>
                 <Carousel
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    partialVisible={false}
                    arrows={true}
                    itemClass="car-event"
                    >
                   {createCurrEvents}
                </Carousel>
            </div>

            <div className="list">
             <h3 id="title"> Resubmit Events </h3>
             <Carousel
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    partialVisible={false}
                    arrows={true}
                    itemClass="car-event"
                    >
                   {createSubEvents}
                </Carousel>
            </div>

            <div className="list">
             <h3 id="title"> Pending Events </h3>
             <Carousel
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    partialVisible={false}
                    arrows={true}
                    itemClass="car-event"
                    >
                   {createRevEvents}
                </Carousel>
            </div>

            <div className="list">
            <h3 id="title"> Incomplete Events </h3>
            <Carousel
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    partialVisible={false}
                    arrows={true}
                    itemClass="car-event"
                    >
                   {createPastEvents}
                </Carousel>
            </div>

            <div className="list">
            <h3 id="title"> Completed Events </h3>
            <Carousel
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}
                    ssr={true}
                    infinite={true}
                    partialVisible={false}
                    arrows={true}
                    itemClass="car-event"
                    >
                   {createCompEvents}
                </Carousel>
            </div>

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

            <div className="row justify-content-center">
                <div > You Currently have no Events</div>
            </div>
        </div>
    ) 

    return(
        (loading) ? loadingscreen : (count> 0) ? eventsList : noEvents
    )

}

export default OrganizerMain
