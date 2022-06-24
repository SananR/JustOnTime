import React from 'react';
import "./main.css";

import logo from "./logo.png";

function OrganizerMain() {
    return (
        <div>
            <div class="top">
                <h1 id="title"> My Events </h1>
                <button id="createEvent">New Event</button>
            </div>
            <div class="list">
            import logo from './logo.png'
                <button id="button1" class="event">
                    <img src={logo} alt='JustOnTime' width="300" height="100"/><br></br>
                    Event 1<br></br>
                    Date: Jan 1<br></br>
                    Highest: $0
                </button>

                <div id="div1">
                    <img src={logo} alt='JustOnTime' width="300" height="100"/><br></br>
                    Event 1<br></br>
                    Date: Jan 1<br></br>
                    Highest: $0
                </div>
                <button class="event">Event 1</button>
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
                <button class="event">Event 15</button>
            </div>
        </div>
    );
}

export default OrganizerMain;