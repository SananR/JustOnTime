import React from "react";
import Carousel from "react-multi-carousel"

import backgroundImage from "../../../card-bg2.jpg"
import backgroundImage2 from "../../../card-bg3.jpg"
import backgroundImage3 from "../../../card-bg.jpg"

import "./topeventcarousel.css"
import "react-multi-carousel/lib/styles.css";

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

    function createEventSlide(backgroundImage) {
        return (
            <div className="container position-relative testing w-100 h-100">
                <img className="position-relative testing2 w-100 h-100 img-fluid" src={backgroundImage}/>
            </div>
        )
    }

    return (
        <div className="top-slider-container position-relative">
            <Carousel
                className="top-slider h-100 w-100 position-relative"
                swipeable={true}
                draggable={true}
                responsive={responsive}
                showDots={true}
                ssr={true}
                autoPlay={true}
                infinite={true}
            >
                {createEventSlide(backgroundImage)}
                {createEventSlide(backgroundImage2)}
                {createEventSlide(backgroundImage3)}
            </Carousel>
        </div>
    )
}

export default TopEventCarousel