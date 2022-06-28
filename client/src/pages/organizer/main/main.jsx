import React from 'react';
import axios from 'axios';
import "./main.css";
import logo from './logo.png';

export default class OrganizerMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = { events: [] };
    }

    componentDidMount() {
        axios.get("/organizerEvents")
        .then(res => {
            this.setState({events: res.data});
        })
    }

    render() {
        return (
            <div>
                <div className="top">
                    <h1 id="title"> My Events </h1>
                    <button id="createEvent">New Event</button>
                </div>
                <div className="list">
                    {
                        this.state.events
                        .map(event =>
                            <button class="event">
                                {event.eventImage_path}<br/>
                                {event.name}<br/>
                                {event.time}<br/>
                                {event.address.street}<br/>
                                {event.address.city}<br/>
                                {event.address.country}
                            </button>
                        )
                    }
                    {/* remove once events are added */}
                    <button class="event">
                        <img src={logo} alt='JustOnTime' width="150" height="100"/><br/>
                        Event 1<br/>
                        January 1, 2022<br/>
                        6:00 p.m.<br/>
                        123 Main Street<br/>
                        Toronto<br/>
                        Canada
                    </button>
                </div>
            </div>
        );
    }
}