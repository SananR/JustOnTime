import React, {useEffect, useState} from "react";
import { loadOrganizers, verifyOrganizer } from "../../../features/verifyOrganizers/verifyOrganizerService";
import VerifyOrganizerNode from '../node/verifyOrganizerNode'
import './verifyOrganizerForm.css'


function VerifyOrganizerForm(props){
    
    const [unverifiedOrganizers, setUnverifiedOrganizers] = useState([]);
    
    useEffect(async () => {
        try {
            const organizers = await loadOrganizers()
            setUnverifiedOrganizers(organizers.users);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message || error.toString();
            console.log(message)
        }
    }, [])
    
    const onClick = async (email) => {
        try {
            const data = await verifyOrganizer(email)
            setUnverifiedOrganizers(unverifiedOrganizers.filter(organizer => {
                return organizer._id !== data.user._id
            }))
        } catch (e) {
            console.log(e)
        }
    }

    const organizerList = () => {
        if (!unverifiedOrganizers){ return }
        const renderedList = unverifiedOrganizers.map(organizer => {
            return <VerifyOrganizerNode organizer={organizer} onClick={() => {onClick(organizer.userInfo.email)}}/>
        })
        return renderedList
    }


    return (
        <div id="verify-organizer-container" class="mt-5 mb-5 p-5 shadow-lg container">
            <h1 id="verify-organizer-text" class="p-5 text-center"><strong>List of Organizers to Verify</strong></h1>
                <div id="organizers">
                {organizerList()}
                </div>
        </div>
    )
}

export default VerifyOrganizerForm