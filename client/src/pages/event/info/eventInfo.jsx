import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import "./eventInfo.css"
import { loadAnEvent, getEventImage } from '../../../services/event/eventService';
import ImageSlider from '../../../components/event/infopage/imageCarousel';

function EventInfo() {

    const [event, setEvent] = useState(true);
    const [image, setImage] = useState("");

    const { eventId } = useParams();

    useEffect(() => {
        loadAnEvent(eventId).then(async response => {
            console.log(response)
            const eventImage = await getEventImage(eventId).then(response)
            setImage(eventImage)
            console.log(image)            
            setEvent(response)
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
            {event === false && <h1 className="text-center mt-5">The event is not found</h1>}
            {event !== false && event !== true &&
                <div className="m-5">
                    <h1 className='m-1 font-weight-bold'>{event.title}</h1>
                    <div className='d-flex flex-row mb-5 font-weight-bold'>
                        <div className="p-2">{event.date}</div>
                        <div className="p-2">{event.time}</div>
                        <div className="p-2">{event.location.city + ", " + event.location.street}</div>
                    </div>
                    <ImageSlider images={[image]}></ImageSlider>
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