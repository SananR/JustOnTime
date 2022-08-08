import React, {useEffect, useState} from 'react'
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loadSearchedEvents } from '../../../../services/event/eventService';
import RenderSearchCards from '../../../../components/event/search/searchEventCard';
import { useParams } from 'react-router-dom';
import Spinner from '../../../../components/spinner/Spinner';
import EventCard from '../../../../components/event/card/EventCard';
import pic from "../../../../no-result.jpg"

function Search(){
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [flag, setFlag] = useState(false);
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('=');
    var searchTerm = url[1]
    console.log(searchTerm)
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();
    useEffect( () => {
        const fetchEvents = async() => {
            setIsLoading(true)
            const events = await loadSearchedEvents(searchTerm);
            setEvents(() => (events));
            if(events.length === 0){
                setFlag(true)
            }
            if(events.length !== 0){
                setFlag(false)
            }
        }
        fetchEvents().catch(console.error);
        setIsLoading(false)
    }, [events, flag, isLoading]);

    function createEventCards() {
        return events.map(event => {
            return <EventCard
                key={event.id.toString()}
                id={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                bidHistory = {event.bidHistory}
                location={event.location}
                currentBid={event.currentBid}
                previousBid={event.previousBid}
                starred={event.starred}
                timeRemaining={event.timeRemaining}
                eventIcon={event.icon}
            />
        })
    }
    const loadingscreen =  (
        <div>

            <div className="row justify-content-center">
                <div id="loader" className="spinner-border text-primary" role="status"></div>
            </div>
        </div>
    ) 
    
    return (<div className="grid container-fluid w-100 h-100">
        {isLoading && loadingscreen}
        {flag && 
            <div className="container">
                <div><img src = {pic} alt = "no-result" height={350} width = {500}></img></div>
                <div className = "text-center"><h1>No events found</h1></div>
                <div className = "text-center"><p className='font-weight-light'>We've searched more than 350 events</p></div>
                <div className = "text-center"> <p className='font-weight-light'>We did not find any events for your search</p></div>
                <div className= "text-center pt-3"><button className="btn btn-success" onClick= {() => {navigate("/")}}>Home page</button></div>
            </div>
        }
        {!flag && createEventCards()}
        </div>);
}

export default Search