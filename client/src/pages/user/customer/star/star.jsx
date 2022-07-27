import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { updateUser } from '../../../../services/auth/authSlice.js'
import axios from 'axios'
import { getEventImage } from "../../../../services/event/eventService"
import './star.css'
import starFilled from '../../../../star_filled.png'
import starUnfilled from '../../../../star_unfilled.png'

function CustomerStar() {
    const [eventState, setEventState] = useState({})
    const [error, setError] = useState()
    const [loading, setLoading] = useState(true)
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const navigate = useNavigate()

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
                setLoading(true)
                await axios.get('/api/event/').then(function(res) {
                    res = res.data.events
                    for (let index = 0; index < res.length; index++) {
                        res[index]["blob"] = getEventImage(res[index].id)
                        if (user.starredEvents.includes(res[index].id))
                            res[index]["starred"] = true
                        else
                            res[index]["starred"] = false
                    }
                    setEventState(res)
                }
                )
            } catch (e) {
                setError(e)
            } finally {
                setLoading(false)
            }
        })
        fetchData()
    }, [user])

    const handleStar = (async (e, event) => {
        try {
            e.stopPropagation()
            setLoading(true)
            const userId = user._id
            const eventId = event.id
            var events = [...user.starredEvents]
            if (events.includes(eventId))
                events.splice(events.indexOf(eventId), 1)
            else
                events.push(eventId)
            dispatch(updateUser({"update": {"starredEvents": events}, "id": userId}))
        } catch (e) {
            setError(e)
        } finally {
            setLoading(false)
        }
    })

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
                                <button className="star" onClick={(e) => handleStar(e, event)}>
                                    {(event.starred && <img src={starFilled} alt="star-filled" width="25" height="25"/>) ||
                                    (!event.starred && <img src={starUnfilled} alt="star-unfilled" width="25" height="25"/>)}
                                </button>
                            </button>
                        )
                    }
                </div>
            </div>
        )
    }
}

export default CustomerStar