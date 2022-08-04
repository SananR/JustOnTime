import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'
import './main.css'
import Carousel from "react-multi-carousel"
import EventCard from "../../../../components/event/card/EventCard"

function OrganizerMain() {
    const [currEvents, setCurrEvents] = useState([]);
    const [subEvents, setSubEvents] = useState([]);
    const [revEvents, setRevEvents] = useState([]);
    const [compEvents, setCompEvents] = useState([]);
    const [pastEvents, setPastEvents] = useState([]);
    const [count, setCount] = useState(-1); 
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true)
    const user = useSelector((state) => state.auth.user);
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
                if(response.data.events[i].status.toUpperCase() === "ONGOING"){
                    curr.push(response.data.events[i])
                } else if(response.data.events[i].status.toUpperCase() === "COMPLETED"  ){
                    comp.push(response.data.events[i])
                } else if(response.data.events[i].status.toUpperCase() === "NEEDS_RESUBMISSION"){
                    sub.push(response.data.events[i])
                } else if(response.data.events[i].status.toUpperCase() === "UNDER_REVIEW" ){
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
        } else if (count != -1) {
            setLoading(false);
        }
    }, [currEvents, pastEvents, revEvents, subEvents, compEvents, count])


    const createCurrEvents = (
        currEvents.map(event =>
            <EventCard
            key={event.id.toString()}
            id={event.id}
            title={event.name}
            date={"2022-08-10"}
            time={event.time}
            location={event.address.suiteNo, event.address.street}
            currentBid={(event.bidHistory && event.bidHistory.length > 0) ? event.bidHistory[event.bidHistory.length-1].bidAmount : "--" }
            previousBid={(event.bidHistory && event.bidHistory.length > 1) ? event.bidHistory[event.bidHistory.length-2].bidAmount : "--"}
            url={"/event/" + event.id}
            timeRemaining={"12:00"}
            />
        )
    ) 

    const createRevEvents = (
        revEvents.map(event =>
            <EventCard
            key={event.id.toString()}
            id={event.id}
            title={event.name}
            date={"2022-08-10"}
            time={event.time}
            location={event.address.suiteNo, event.address.street}
            currentBid={(event.bidHistory && event.bidHistory.length > 0) ? event.bidHistory[event.bidHistory.length-1].bidAmount : "--" }
            previousBid={(event.bidHistory && event.bidHistory.length > 1) ? event.bidHistory[event.bidHistory.length-2].bidAmount : "--"}
            timeRemaining= {"——:——"}
            />
        )
    ) 

    const createSubEvents = (
        subEvents.map(event =>
            <EventCard
            key={event.id.toString()}
            id={event.id}
            title={event.name}
            date={"2022-08-10"}
            time={event.time}
            location={event.address.suiteNo, event.address.street}
            currentBid={(event.bidHistory && event.bidHistory.length > 0) ? event.bidHistory[event.bidHistory.length-1].bidAmount : "--" }
            previousBid={(event.bidHistory && event.bidHistory.length > 1) ? event.bidHistory[event.bidHistory.length-2].bidAmount : "--"}
            timeRemaining= {"——:——"}
            />
        )
    ) 


    const createPastEvents = (
        pastEvents.map(event =>
            <EventCard
            key={event.id.toString()}
            id={event.id}
            title={event.name}
            date={"2022-08-10"}
            time={event.time}
            location={event.address.suiteNo, event.address.street}
            currentBid={(event.bidHistory && event.bidHistory.length > 0) ? event.bidHistory[event.bidHistory.length-1].bidAmount : "--" }
            previousBid={(event.bidHistory && event.bidHistory.length > 1) ? event.bidHistory[event.bidHistory.length-2].bidAmount : "--"}
            url={"/event/" + event.id}
            timeRemaining= {"——:——"}
            />
        )
    ) 

    const createCompEvents = (
        compEvents.map(event =>
            <EventCard
            key={event.id.toString()}
            id={event.id}
            title={event.name}
            date={"2022-08-10"}
            time={event.time}
            location={event.address.suiteNo, event.address.street}
            currentBid={(event.bidHistory && event.bidHistory.length > 0) ? event.bidHistory[event.bidHistory.length-1].bidAmount : "--" }
            previousBid={(event.bidHistory && event.bidHistory.length > 1) ? event.bidHistory[event.bidHistory.length-2].bidAmount : "--"}
            timeRemaining= {"00:00"}
            />
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
                <button id="createEvent" onClick={() => navigate("/organizer/createEvent")}>New Event</button>
            </div>
           
           {currEvents.length > 0 && <div className="list">
                 <h3 id="title"> Current Events </h3>
                 <Carousel
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}
                    showDots={true}
                    ssr={true}
                    infinite={true}
                    partialVisible={true}
                >
                    {createCurrEvents}
                </Carousel>
            </div>}

            {subEvents.length > 0 && <div className="list">
             <h3 id="title"> Resubmit Events </h3>
             <Carousel
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}
                    showDots={true}
                    ssr={true}
                    infinite={true}
                    partialVisible={true}
                >
                    {createSubEvents}
                </Carousel>
            </div>}

            { revEvents.length > 0 && <div className="list">
             <h3 id="title"> Pending Events </h3>
             <Carousel
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}
                    showDots={true}
                    ssr={true}
                    infinite={true}
                    partialVisible={true}
                >
                    {createRevEvents}
                </Carousel>
            </div>}

          {pastEvents.length > 0 &&  <div className="list">
            <h3 id="title"> Incomplete Events </h3>
            <Carousel
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}
                    showDots={true}
                    ssr={true}
                    infinite={true}
                    partialVisible={true}
                >
                    {createPastEvents}
                </Carousel>
            </div>}

           { compEvents.length > 0 && <div className="list">
            <h3 id="title"> Completed Events </h3>
            <Carousel
                    swipeable={true}
                    draggable={true}
                    responsive={responsive}
                    showDots={true}
                    ssr={true}
                    infinite={true}
                    partialVisible={true}
                >
                    {createCompEvents}
                </Carousel>
            </div> }
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
        (user.userType === "Customer") ? pageDNE : (loading) ? loadingscreen : (count> 0) ? eventsList : noEvents
    )

}

export default OrganizerMain
