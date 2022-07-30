
import React, {useEffect, useState} from "react";
import "./searchEventCard.css";
import { Card } from "react-bootstrap";
import { getEventImage } from "../../../services/event/eventService";

function RenderSearchCards(props){

    const [image, setImage] = useState("");

    useEffect( () => {
        const fetchImage = async() => {
            const img = await getEventImage(props.id);
            setImage(() => (img));
        }
        fetchImage().catch(console.error);
    }, []);

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 2000 },
            items: 1,
            slidesToSlide: 1,
        },
        laptop: {
            breakpoint: { max: 1300, min: 464 },
            items: 1,
            slidesToSlide: 1,
        },
        tablet: {
            breakpoint: { max: 1090, min: 710 },
            items: 1,
            slidesToSlide: 1,
        },
        mobile: {
            breakpoint: { max: 710, min: 0 },
            items: 1,
            slidesToSlide: 1,
        }
    };

    return (
        <Card style={{ width: "18rem" }} key={props.key} className="box mt-5 mb-5 g-0  d-flex" responsive = {responsive}>
            <Card.Img variant="top" className = "event-image-container w-100 bg-image" src={URL.createObjectURL(new Blob([image], {type:"image/jpeg"}))} />
            <Card.Body className = "event-content-container d-none d-md-block gap-0 g-0 d-flex flex-column justify-content-center align-items-start">
                <Card.Title>{props.title}</Card.Title>
                <Card.Text className="event-card-meta">{props.date} • {props.time} • {props.location}</Card.Text>
            </Card.Body>
        </Card>
    );
}

export default RenderSearchCards