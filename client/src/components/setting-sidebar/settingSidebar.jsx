import React from 'react';
import './SettingSidebar.module.css'

//update the bar as we add more services then it will be uniform for all settings pages

function SettingSidebar() {
    return (
        <div id="sidebar-cont">
            <a href='/personal-info' > <span id='sidebar-nav'> Personal Information</span></a>
            <a href='/reset-link/password' > <span id='sidebar-nav'> Change Password</span></a>
            <a href='/reset-link/email' > <span id='sidebar-nav'> Change Email</span></a>
         </div>
    );
}


export default SettingSidebar; 