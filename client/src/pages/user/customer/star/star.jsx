import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getEventImage } from "../../../../services/event/eventService"
import './star.css'
import starFilled from './star_filled.png'
import starUnfilled from './star_unfilled.png'

function CustomerStar() {
    const [eventState, setEventState] = useState({})
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    const handleStar = (e, event) => {
        e.stopPropagation()

        // update database
        event.starred = true
        console.log("starred")
    }

    const handleUnstar = (e, event) => {
        e.stopPropagation()

        // update database
        event.starred = false
        console.log("unstarred")
    }

    const Heading = () => {
        return (
            <div className="top">
                <h1 id="title"> Events </h1>
            </div>
        )
    }

    useEffect(() => {
        const fetchData = (async () => {
            try {
                await axios.get('/api/event/').then(function(res) {
                    res = res.data.events;
                    console.log(res);
                    for (let index = 0; index < res.length; index++) {
                        res[index]["blob"] = getEventImage(res[index].id)

                        // will be gotten from database
                        res[index]["starred"] = false
                    }
                    setEventState(res);
                }
                );
            } catch (e) {
                setError(e);
            } finally {
                setLoading(false);
            }
        })
        fetchData();
    }, [])

    if (error) {
        return (
            <div>
                <Heading/>
                <p id="error">An error occurred while trying to load the events</p>
            </div>
    )
    } else if (loading) { 
        return (
            <div>
                <Heading/>
                <div className="row justify-content-center">
                    <div id="loader" className="spinner-border text-primary" role="status"></div>
                </div>
            </div>
        ) 
    } else {
        return (
        <div>
            <Heading/>
            <div className="list">
                {
                    eventState.map(event =>
                        <button className="event" onClick={() => navigate("/event/" + event.id)}>
                            {event.name}<br/>
                            {event.time}<br/>
                            {event.location}<br/>
                            {(event.starred && <button className="star" onClick={(e) => handleUnstar(e, event)}>
                                <img src={starFilled} width="25" height="25"/></button>) ||
                             (!event.starred && <button className="star" onClick={(e) => handleStar(e, event)}>
                                <img src={starUnfilled} width="25" height="25"/></button>)}
                        </button>
                    )
                }
            </div>
        </div>
        )
    }
}

export default CustomerStar