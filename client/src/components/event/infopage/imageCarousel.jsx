import React from "react";

import Carousel from "react-multi-carousel"
import './imageCarousel.css'
function ImageSlider(props) {

    const responsive = {
        bigdesktop: {
            breakpoint: { max: 3000, min: 1800 },
            items: 1,
            slidesToSlide: 5,
        },
        desktop: {
            breakpoint: { max: 1800, min: 1300 },
            items: 1,
            slidesToSlide: 4,
        },
        laptop: {
            breakpoint: { max: 1300, min: 464 },
            items: 1,
        },
        tablet: {
            breakpoint: { max: 1090, min: 900 },
            items: 1,
        },
        tablet2: {
            breakpoint: { max: 900, min: 800 },
            items: 1,
        },
        tablet3: {
            breakpoint: { max: 800, min: 710 },
            items: 1,
        },
        mobile: {
            breakpoint: { max: 710, min: 0 },
            items: 1,
        }
    };

    function createImagePanels() {
        return props.images.map(image => {
            return <img src={`http://localhost:3000/${image.substring(3)}`} key={image} className="event-image"/>
        })
    }

    return (
        <Carousel className="carousel-container rounded"
            swipeable={true}
            draggable={true}
            responsive={responsive}
            arrows={true} 
            showDots={true} 
            ssr={true}
            infinite={true}
            keyBoardControl={true}
        >
            {createImagePanels()}
        </Carousel>
    )
}

export default ImageSlider