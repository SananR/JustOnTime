import React, {useEffect, useState} from 'react'
import { loadSearchedEvents } from '../../../../services/event/eventService';
import RenderSearchCards from '../../../../components/event/search/searchEventCard';
import { useParams } from 'react-router-dom';

function Search(){
    const [events, setEvents] = useState([]);
    var { searchTerm } = useParams();
    console.log(events)
    useEffect( () => {
        const fetchEvents = async() => {
            const events = await loadSearchedEvents(searchTerm);
            setEvents(() => (events));
        }
        fetchEvents().catch(console.error);
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
    
    return <div className="grid container-fluid w-100 h-100">{createEventCards()}</div>;
}

export default Search