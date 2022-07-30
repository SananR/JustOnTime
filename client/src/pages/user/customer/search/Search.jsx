import React, {useEffect, useState} from 'react'
import { loadSearchedEvents } from '../../../../services/event/eventService';
import RenderSearchCards from '../../../../components/event/search/searchEventCard';
import { useParams } from 'react-router-dom';
import Spinner from '../../../../components/spinner/Spinner';

function Search(){
    const [events, setEvents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    var { searchTerm } = useParams();
    console.log(events)
    useEffect( () => {
        const fetchEvents = async() => {
            setIsLoading(true)
            const events = await loadSearchedEvents(searchTerm);
            setEvents(() => (events));
        }
        fetchEvents().catch(console.error);
        setIsLoading(false)
    }, []);

    function createEventCards() {
        return events.map(event => {
            return <RenderSearchCards
                key={event.id.toString()}
                id={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                currentBid={event.currentBid}
                previousBid={event.previousBid}
                starred={event.starred}
                timeRemaining={event.timeRemaining}
                eventIcon={event.icon}
            />
        })
    }
    
    return (<div className="grid container-fluid w-100 h-100">
        <Spinner color={"#ff6178"} loading={isLoading} size={75} />
        {events.length !== 0 && createEventCards()}
        </div>);
}

export default Search