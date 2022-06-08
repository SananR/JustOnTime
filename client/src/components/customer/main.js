import React from 'react';
import "./main.css";

function CustomerMain() {
    return (
        <div>
            <div class="topnav">
                <ul>
                    <li><a id="Home" href="/customer/main">Home</a></li>
                    <li><a id="Starred" href="/customer/main">Starred</a></li>
                    <li><input id="searchbar" type="text" placeholder="Search..."></input></li>
                    <li><a id="Profile" href="/customer/main">Profile</a></li>
                    <li><a id="Logout" href="/customer/main">Logout</a></li>
                </ul>
            </div>
            <h1 id="title"> Customer main page </h1>
        </div>
    );

}

export default CustomerMain;