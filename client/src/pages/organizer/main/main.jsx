import React from 'react';
import "./main.css";
import axios from 'axios';

export default class OrganizerMain extends React.Component {

    constructor(props) {
        super(props);
        this.state = {events: []};
    }

    componentDidMount() {
        axios.get("")
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
                            <button class="event">{event.name}</button>
                        )
                    }
                    {/* <button class="event">
                        <img src={logo} alt='JustOnTime' width="150" height="100"/><br></br>
                        Event 1<br></br>
                        Date: Jan 1<br></br>
                        Highest: $0
                    </button> */}
                    <button class="event">Event 1</button>
                    {/* <button class="event">Event 1</button>
                    <button class="event">Event 2</button>
                    <button class="event">Event 3</button>
                    <button class="event">Event 4</button>
                    <button class="event">Event 5</button>
                    <button class="event">Event 6</button>
                    <button class="event">Event 7</button>
                    <button class="event">Event 8</button>
                    <button class="event">Event 9</button>
                    <button class="event">Event 10</button>
                    <button class="event">Event 11</button>
                    <button class="event">Event 12</button>
                    <button class="event">Event 13</button>
                    <button class="event">Event 14</button>
                    <button class="event">Event 15</button> */}
                </div>
            </div>
        );
        }
}