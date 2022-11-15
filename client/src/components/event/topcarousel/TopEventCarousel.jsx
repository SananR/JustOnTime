import React, {useEffect, useState} from "react";
import { useRouter } from 'next/router'
import Carousel from "react-multi-carousel"

import "./TopEventCarousel.module.css"
import "react-multi-carousel/lib/styles.css";

import {HiArrowCircleRight} from "react-icons/hi";
import {getEventImage} from "../../../services/event/eventService";


function EventSlide(props) {

    const [image, setImage] = useState("");
    const router = useRouter();

    useEffect( () => {
        const fetchImage = async() => {
            const img = await getEventImage(props.id);
            setImage(() => (img));
        }
        fetchImage().catch(console.error);
    }, []);

    const handleClick = () => {
        if (props.status === undefined || props.status === "ONGOING"){
            router.push(`/event/${props.id}`);
        }
    }

    return (
        <div onClick={handleClick} className="container-fluid position-relative d-flex testing w-100 h-100 bg-image">
            <div className="w-100 h-100 position-absolute d-flex flex-column align-items-start justify-content-center">
                <div className="position-absolute w-100 h-100 cover-shadow"></div>
                <div className="d-flex justify-content-start align-items-end w-100 ">
                    <h1 className="ps-4 pt-5 top-event-title">{props.title}</h1>
                </div>
                <h1 className="ps-4 top-event-meta">{props.date} • {props.time} • {props.location}</h1>
                <h1 className="arrow-text ps-4 mt-1">SEE DETAILS</h1>
                <HiArrowCircleRight className="arrow ms-4 mb-1" color={"aqua"} size={50}/>
            </div>
            <img className="top-event-image testing2 w-100 h-100 img-fluid" alt="event" src={URL.createObjectURL(new Blob([image], {type:"image/jpeg"}))}/>
        </div>
    )
}

function TopEventCarousel(props) {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1300 },
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

    function createEventSlides(events) {
        return events.map(event => {
            return <EventSlide
                key={event.id.toString()}
                id={event.id}
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                status={event.status}
            />
        })
    }

    return (
        <div className="mt-3 top-slider-container position-relative">
            <Carousel
                className="top-slider h-100 w-100 position-relative"
                swipeable={true}
                draggable={true}
                responsive={responsive}
                showDots={true}
                ssr={true}
                autoPlay={false}
                infinite={true}
            >
                {createEventSlides(props.events)}
            </Carousel>
        </div>
    )
}

export default TopEventCarousel