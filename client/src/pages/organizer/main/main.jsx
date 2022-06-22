import React from 'react';
import "./main.css";

function OrganizerMain() {
    return (
        <div id="page">
            <div id="top">
                <h1 id="title"> My Events </h1>
                <button id="create_event">New Event</button>
            </div>
            <div class="list">
                <button class="event">Event 1</button><br></br>
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