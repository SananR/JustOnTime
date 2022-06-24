import React from "react";

import EventCard from "../card/EventCard";
import Carousel from "react-multi-carousel"

import "react-multi-carousel/lib/styles.css";
import "./eventslider.css"

function EventSlider(props) {

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1300 },
            items: 4,
            slidesToSlide: 4,
            partialVisibilityGutter: 10
        },
        laptop: {
            breakpoint: { max: 1300, min: 464 },
            items: 3,
            partialVisibilityGutter: 20
        },
        tablet: {
            breakpoint: { max: 1090, min: 900 },
            items: 2,
            partialVisibilityGutter: 100
        },
        tablet2: {
            breakpoint: { max: 900, min: 800 },
            items: 2,
            partialVisibilityGutter: 50
        },
        tablet3: {
            breakpoint: { max: 800, min: 710 },
            items: 2,
            partialVisibilityGutter: 10
        },
        mobile: {
            breakpoint: { max: 710, min: 0 },
            items: 1,
            partialVisibilityGutter: 200
        }
    };

    function createEventCards() {
        return props.events.map(event => {
            return <EventCard
                title={event.title}
                date={event.date}
                time={event.time}
                location={event.location}
                currentBid={event.currentBid}
                previousBid={event.previousBid}
                image={event.image}
                starred={event.starred}
                timeRemaining={event.timeRemaining}
                className="col-sm-4"
                eventIcon={event.icon}
            />
        })
    }

    return (
        <Carousel
            swipeable={true}
            draggable={true}
            responsive={responsive}
            showDots={true}
            ssr={true}
            infinite={true}
            partialVisbile={true}
        >
            {createEventCards()}
        </Carousel>
    )
}

export default EventSlider