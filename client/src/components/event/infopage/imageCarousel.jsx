import React from "react";

import Carousel from "react-multi-carousel"
import './imageCarousel.css'
function ImageSlider(props) {

    const responsive = {
        bigdesktop: {
            breakpoint: { max: 3000, min: 1800 },
            items: 5,
            slidesToSlide: 5,
        },
        desktop: {
            breakpoint: { max: 1800, min: 1300 },
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

    function createImagePanels() {
        return props.images.map(image => {
            return <img src={URL.createObjectURL(image)} key={image} className="event-image"/>
        })
    }

    return (
        <Carousel className="container rounded"
            swipeable={true}
            draggable={true}
            responsive={responsive}
            arrows={true} 
            showDots={true} 
            ssr={true}
            infinite={true}
            partialVisible={false}
        >
            {createImagePanels()}
            <p className="event-image h-100" style={{backgroundColor:"grey"}}>Image1</p>
            <p className="event-image h-100" style={{backgroundColor:"aqua"}}>Image2</p>
            <p className="event-image h-100" style={{backgroundColor:"grey"}}>Image3</p>
        </Carousel>
    )
}

export default ImageSlider