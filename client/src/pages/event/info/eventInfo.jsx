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
        <div className="container-fluid w-100 h-100">
            {event === false && <h1 className="text-center mt-5">The event is not found</h1>}
            {event !== false && event !== true &&
                <div className="m-5">
                    <div className='display-1 m-1 text-uppercase fw-bolder'>{event.title}</div>
                    <div className='d-flex flex-row mb-3'>
                        <p className='m-1'>{event.date}</p>
                        <p className='m-1'>{" · "}</p>                            
                        <p className='m-1'>{event.time}</p>
                        <p className='m-1'>{" · "}</p>
                        <p className='m-1 fst-italic'>{event.location.city + ", " + event.location.street}</p>
                    </div>
                    <ImageSlider images={[image]}></ImageSlider> 
                    <div className="d-flex flex-row justify-content-around mt-5">
                        <div className=''>
                            <div className='d-flex flex-row justify-content-between'>
                                <div className="h5" style={{color: "dodgerblue"}}>{event.tags.map(tag => {if (tag!=="") return "#" + tag + " " })}</div>
                                <div className="d-inline h5">Time Remaining: <div className= "d-inline" style={{color: "red"}}>{event.timeRemaining}</div></div>   
                            </div>
                            <hr></hr>
                            <div className='h3'>{event.description}{event.description}{event.description}</div> 
                        </div>  
                        <div className="p-2">Flex item 3</div>  
                    </div>

                </div>
            }
        </div>
    )
}

export default EventInfo