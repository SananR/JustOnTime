import React from 'react'
import VerifyOrganizerNode from './node/verifyOrganizerNode'
import './verifyOrganizerForm.css'

function VerifyOrganizerForm(props){
    return (
        <div id="verify-organizer-container" class="mt-5 mb-5 p-5 shadow-lg container">
            <h1 id="verify-organizer-text" class="p-5 text-center"><strong>List of Organizers to erify</strong></h1>
            <VerifyOrganizerNode name="Yuto Omachi" email="myverylongemailmayovertheline@gmail.com"/>
            <VerifyOrganizerNode name="Yuto Omachi" email="myshortemail@gmail.com"/>
        </div>
    )
}

export default VerifyOrganizerForm