import React from 'react'
import './verifyOrganizerNode.css'

function VerifyOrganizerNode(props){
    return (
        <div id="verify-organizer-node-container" class="mt-2 mb-2 shadow-sm container">
            <div class="row p-3">            
                <p id="verify-organizer-node-name" class="col m-2 text-center my-auto overflow-auto hide-scroll-bar">{props.name}</p>
                <p id="verify-organizer-node-email" class="col m-2 text-center my-auto overflow-auto hide-scroll-bar">{props.email}</p>
                <button id="verify-organizer-node-button" class="col m-2 btn btn-outline-success">Verify</button>
            </div>

        </div>
    )
}

export default VerifyOrganizerNode