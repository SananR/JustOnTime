import React from 'react';
import "./main.js"

function OrganizerMain() {
    return (
        <div>
            <div class="topnav">
                <ul>
                    <li><a id="Home" href="/organizer/main">Home</a></li>
                    <li><a id="Starred" href="/organizer/main">Starred</a></li>
                    <li><input id="Searchbar" type="text" placeholder="Search..."></input></li>
                    <li><a id="Profile" href="/organizer/main">Profile</a></li>
                    <li><a id="Logout" href="/login">Logout</a></li>
                </ul>
            </div>
            <h1 id="title"> Customer main page </h1>
        </div>
    );
}

export default OrganizerMain;