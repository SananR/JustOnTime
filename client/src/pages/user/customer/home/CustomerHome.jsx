import React from 'react'
import {useSelector} from 'react-redux'
import {MdSportsFootball} from "react-icons/md"
import cardBackground from "../../../../card-bg.jpg"
import cardBackground2 from "../../../../card-bg2.jpg"
import cardBackground3 from "../../../../card-bg3.jpg"

import "./customerhome.css"
import {GiMusicalNotes, GiBigDiamondRing} from "react-icons/gi";
import EventSlider from "../../../../components/event/slider/EventSlider";

function CustomerHome() {
    const events = [
        {
            title: "Harry Styles",
            date: "Tue 8/16",
            time: "8:30 PM",
            location: "Scotiabank",
            currentBid: 228,
            previousBid: 192,
            image: cardBackground,
            timeRemaining: "10:53:26",
            icon: <GiMusicalNotes className="position-absolute start-0 top-0 ms-2 mt-2" size={40} color={"white"}/>
        },
        {
            title: "Toronto Blue Jays",
            date: "Mon 6/27",
            time: "7:07 PM",
            location: "Rogers Centre",
            currentBid: 85,
            previousBid: 77,
            image: cardBackground2,
            timeRemaining: "22:30:58",
            starred: true,
            icon: <MdSportsFootball className="position-absolute start-0 top-0 ms-2 mt-2" size={40} color={"white"}/>
        },
        {
            title: "Graydon Hall Manor",
            date: "Mon 8/1",
            time: "7:00 AM",
            location: "North York",
            currentBid: "13,050",
            previousBid: "0",
            image: cardBackground3,
            timeRemaining: "1:14:01",
            starred: true,
            icon: <GiBigDiamondRing className="position-absolute start-0 top-0 ms-2 mt-2" size={40} color={"white"}/>
        },
        {
            title: "Harry Styles",
            date: "Tue 8/16",
            time: "8:30 PM",
            location: "Scotiabank",
            currentBid: 228,
            previousBid: 192,
            image: cardBackground,
            timeRemaining: "10:53:26",
            icon: <GiMusicalNotes className="position-absolute start-0 top-0 ms-2 mt-2" size={40} color={"white"}/>
        },
        {
            title: "Toronto Blue Jays",
            date: "Mon 6/27",
            time: "7:07 PM",
            location: "Rogers Centre",
            currentBid: 85,
            previousBid: 77,
            image: cardBackground2,
            timeRemaining: "22:30:58",
            starred: true,
            icon: <MdSportsFootball className="position-absolute start-0 top-0 ms-2 mt-2" size={40} color={"white"}/>
        },
        {
            title: "Graydon Hall Manor",
            date: "Mon 8/1",
            time: "7:00 AM",
            location: "North York",
            currentBid: "13,050",
            previousBid: "0",
            image: cardBackground3,
            timeRemaining: "1:14:01",
            starred: true,
            icon: <GiBigDiamondRing className="position-absolute start-0 top-0 ms-2 mt-2" size={40} color={"white"}/>
        },
        {
            title: "Harry Styles",
            date: "Tue 8/16",
            time: "8:30 PM",
            location: "Scotiabank",
            currentBid: 228,
            previousBid: 192,
            image: cardBackground,
            timeRemaining: "10:53:26",
            icon: <GiMusicalNotes className="position-absolute start-0 top-0 ms-2 mt-2" size={40} color={"white"}/>
        }
    ];

    const {user} = useSelector((state) => state.auth)
    return (
        <div className="container-fluid w-100 h-100">
            <h1 className="text-center text-danger mt-2">Welcome back, {user.userInfo.firstName}!</h1>
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