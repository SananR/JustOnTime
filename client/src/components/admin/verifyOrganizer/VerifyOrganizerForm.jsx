import React, {useEffect, useState} from "react";
import { loadOrganizers, verifyOrganizer, rejectOrganizer } from "../../../features/verifyOrganizers/verifyOrganizerService";
import VerifyRejectNode from '../node/verifyRejectNode.jsx'
import './verifyOrganizerForm.css'


function VerifyOrganizerForm(props){
    
    const [unverifiedOrganizers, setUnverifiedOrganizers] = useState([]);
    
    useEffect(() => {
        const getAllOrganizers = async () => {
            const organizers = await loadOrganizers()
            setUnverifiedOrganizers(organizers.users);
        }

        getAllOrganizers().catch((error) => {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message || error.toString();
            console.log(message)
        })
    }, [])
    
    const onClickVerify = async (email) => {
        try {
            const data = await verifyOrganizer(email)
            setUnverifiedOrganizers(unverifiedOrganizers.filter(organizer => {
                return organizer._id !== data.user._id
            }))
        } catch (e) {
            console.log(e)
        }
    }

    const onClickReject = async (email) => {
        try {
            const data = await rejectOrganizer(email)
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
            return <VerifyRejectNode 
                key={organizer._id}
                object={organizer}
                firstField={organizer.userInfo.firstName + " " + organizer.userInfo.lastName}
                secondField={organizer.userInfo.email} 
                onClickVerify={() => {onClickVerify(organizer.userInfo.email)}} 
                onClickReject={() => {onClickReject(organizer.userInfo.email)}}/>
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