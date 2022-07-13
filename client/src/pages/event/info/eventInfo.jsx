import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import "./eventInfo.css"
import { loadAnEvent, getEventImage } from '../../../services/event/eventService';

function EventInfo() {

    const [event, setEvent] = useState(true);
    const [image, setImage] = useState("");

    const { eventId } = useParams();

    useEffect(() => {
        loadAnEvent(eventId).then(async response => {
            console.log(response)
            setEvent(response)
            const eventImage = await getEventImage(eventId).then(response)
            setImage(eventImage)
            console.log(eventImage)
        }).catch(err => {
            console.log(err)
            console.log(err.response)
            if (err.response.status / 100 === 4){
                console.error({message: err.response.data.msg})
            }
            else{
                console.error({message: "Something went wrong, please try again!"})
            }        
        })
    }, [eventId])

    return (
        <div className="container-fluid w-100 h-100 ">
            {event == false && <h1 className="text-center mt-5">The event is not found</h1>}
            {event != false && event != true &&
                <div className="d-flex flex-row justify-content-around m-5">
                    <img src={URL.createObjectURL(image)} />
                    <div className="d-flex flex-column">
                        <div className="p-2">Fle x item2</div>  
                        <div className="p-2">Flex item 3</div>  
                    </div>          
                </div>
            }
        </div>
    )
}

export default EventInfo