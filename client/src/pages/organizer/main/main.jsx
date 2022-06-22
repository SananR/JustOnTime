import React from 'react';
import "./main.css";

function OrganizerMain() {
    return (
        <div>
            <div class="top">
                <h1 id="title"> My Events </h1>
                <button id="createEvent">New Event</button>
            </div>
            <div class="list">
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
            <div class="pagination">
                <a href="/organizer/main" class="page">1</a>
                <a href="/organizer/main" class="page">2</a>
                <a href="/organizer/main" class="page">3</a>
                <a href="/organizer/main" class="page">4</a>
                <a href="/organizer/main" class="page">5</a>
            </div>
        </div>
    );
}

export default OrganizerMain;