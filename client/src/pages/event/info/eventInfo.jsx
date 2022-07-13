import React, {useState} from 'react'
import { useParams } from 'react-router-dom';

function EventInfo() {

    const [event, setEvent] = useState([]);

    const { eventId } = useParams();
    console.log(eventId)
    return (
        <div className="container-fluid w-100 h-100 ">
            <div class="d-flex flex-row justify-content-around m-5">
                <div class="p-2 ">{eventId}</div>
                <div class="d-flex flex-column">
                    <div class="p-2">Fle x item2</div>  
                    <div class="p-2">Flex item 3</div>  
                </div>          
            </div>
        </div>
    )
}

export default EventInfo