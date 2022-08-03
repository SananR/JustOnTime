import React, {useEffect, useState} from 'react'
import { loadSearchedEvents } from '../../../../services/event/eventService';
import RenderSearchCards from '../../../../components/event/search/searchEventCard';
import { useParams } from 'react-router-dom';

function Search(){
    const [events, setEvents] = useState([]);
    var { searchTerm } = useParams();
    console.log(events)
    const [flag, setFlag] = useState(false);
    useEffect( () => {
        const fetchEvents = async() => {
            const events = await loadSearchedEvents(searchTerm);
            setEvents(() => (events));
            if(events.length == 0){
                setFlag(true)
            }
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
  
    return (<div className="grid container-fluid w-100 h-100">
        <Spinner color={"#ff6178"} loading={isLoading} size={75} />
        {!flag && user && createEventCards()}
        {flag &&  <h1 className="text-center mt-5">There are no such events</h1>}
        </div>);
}

export default Search