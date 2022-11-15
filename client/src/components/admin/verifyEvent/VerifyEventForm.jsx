import React, {useEffect, useState} from "react";
import { loadEvents, verifyEvent, rejectEvent } from "../../../services/admin/verifyEventService";
import VerifyRejectNode from '../node/verifyRejectNode.jsx'
import './verifyEventForm.module.css'


function VerifyEventForm(props){
    
    const [unverifiedEvents, setUnverifiedEvents] = useState([]);
    
    useEffect(() => {
        const getAllUnverifiedEvents = async () => {
            const data = await loadEvents()
            setUnverifiedEvents(data.events);
            console.log(data)
        }

        getAllUnverifiedEvents().catch((error) => {
            const message = (error.response && error.response.data && error.response.data.message) 
                || error.message || error.toString();
            console.log(message)
        })
    }, [])
    
    const onClickVerify = async (_id) => {
        try {
            const data = await verifyEvent(_id)
            setUnverifiedEvents(unverifiedEvents.filter(event => {
                return event._id !== data.event._id
            }))
            props.onDeleteNode("Event verified successfully")
        } catch (e) {
            console.log(e)
        }
    }

    const onClickReject = async (_id) => {
        try {
            const data = await rejectEvent(_id)
            setUnverifiedEvents(unverifiedEvents.filter(event => {
                return event._id !== data.event._id
            }))
            props.onDeleteNode("Event rejected successfully")
        } catch (e) {
            console.log(e)
        }
    }

    const organizerList = () => {
        if (!unverifiedEvents){ return }
        const renderedList = unverifiedEvents.map(event => {
            return <VerifyRejectNode 
                key={event._id}
                object={event}
                firstField={event.eventInfo.name}
                secondField={event.eventInfo.description} 
                onClickVerify={() => {onClickVerify(event._id)}} 
                onClickReject={() => {onClickReject(event._id)}}/>
        })
        return renderedList
    }


    return (
        <div id="verify-event-container" className="mt-5 mb-5 p-5 shadow-lg container">
            <h1 id="verify-event-text" className="p-5 text-center"><strong>List of Events to Verify</strong></h1>
                <div id="events">
                {organizerList()}
                </div>
        </div>
    )
}

export default VerifyEventForm