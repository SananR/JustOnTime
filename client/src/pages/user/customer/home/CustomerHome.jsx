import React from 'react'

import cardBackground from "../../../../card-bg.jpg"
import cardBackground2 from "../../../../card-bg2.jpg"
import cardBackground3 from "../../../../card-bg3.jpg"

import "./customerhome.css"
import EventSlider from "../../../../components/event/slider/EventSlider";
import TopEventCarousel from "../../../../components/event/topcarousel/TopEventCarousel";

function CustomerHome() {
    const topEvents = [
        {
            id: 1,
            title: "Harry Styles",
            date: "Tue 8/16",
            time: "8:30 PM",
            location: "Scotiabank",
            currentBid: 228,
            previousBid: 192,
            image: cardBackground,
            timeRemaining: "10:53:26",
        },
        {
            id: 2,
            title: "Toronto Blue Jays",
            date: "Mon 6/27",
            time: "7:07 PM",
            location: "Rogers Centre",
            currentBid: 85,
            previousBid: 77,
            image: cardBackground2,
            timeRemaining: "22:30:58",
            starred: true,
        },
        {
            id: 3,
            title: "Graydon Hall Manor",
            date: "Mon 8/1",
            time: "7:00 AM",
            location: "North York",
            currentBid: "13,050",
            previousBid: "0",
            image: cardBackground3,
            timeRemaining: "1:14:01",
            starred: true,
        }
    ];
    const events = [
        {
            id: 1,
            title: "Harry Styles",
            date: "Tue 8/16",
            time: "8:30 PM",
            location: "Scotiabank",
            currentBid: 228,
            previousBid: 192,
            image: cardBackground,
            timeRemaining: "10:53:26",
/*
            --- Event icons removed ---
            icon: <GiMusicalNotes className="position-absolute start-0 top-0 ms-2 mt-2" size={40} color={"white"}/>
*/
        },
        {
            id: 2,
            title: "Toronto Blue Jays",
            date: "Mon 6/27",
            time: "7:07 PM",
            location: "Rogers Centre",
            currentBid: 85,
            previousBid: 77,
            image: cardBackground2,
            timeRemaining: "22:30:58",
            starred: true,
        },
        {
            id: 3,
            title: "Graydon Hall Manor",
            date: "Mon 8/1",
            time: "7:00 AM",
            location: "North York",
            currentBid: "13,050",
            previousBid: "0",
            image: cardBackground3,
            timeRemaining: "1:14:01",
            starred: true,
        },
        {
            id: 4,
            title: "Harry Styles",
            date: "Tue 8/16",
            time: "8:30 PM",
            location: "Scotiabank",
            currentBid: 228,
            previousBid: 192,
            image: cardBackground,
            timeRemaining: "10:53:26",
        },
        {
            id: 5,
            title: "Toronto Blue Jays",
            date: "Mon 6/27",
            time: "7:07 PM",
            location: "Rogers Centre",
            currentBid: 85,
            previousBid: 77,
            image: cardBackground2,
            timeRemaining: "22:30:58",
            starred: true,
        },
        {
            id: 6,
            title: "Graydon Hall Manor",
            date: "Mon 8/1",
            time: "7:00 AM",
            location: "North York",
            currentBid: "13,050",
            previousBid: "0",
            image: cardBackground3,
            timeRemaining: "1:14:01",
            starred: true,
        },
        {
            id: 7,
            title: "Harry Styles",
            date: "Tue 8/16",
            time: "8:30 PM",
            location: "Scotiabank",
            currentBid: 228,
            previousBid: 192,
            image: cardBackground,
            timeRemaining: "10:53:26",
        }
    ];

    return (
        <div className="container-fluid w-100 h-100">
            <TopEventCarousel
                events={topEvents}
            />
            <h2 className="slider-heading mt-2 ms-3 mt-5">Explore Toronto</h2>
            <EventSlider events={events} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            <h2 className="slider-heading mt-2 ms-3 mt-5">Under $100</h2>
            <EventSlider events={events} className="container-fluid row w-100 h-100 gap-0 gx-0" />
            <h2 className="slider-heading mt-2 ms-3 mt-5">Closest to you</h2>
            <EventSlider events={events} className="container-fluid row w-100 h-100 gap-0 gx-0" />
        </div>
    )
}

export default CustomerHome