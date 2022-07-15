import axios from 'axios'

const API_URL = '/api/'

//Load Unverified Events
const loadEvents = async () => {
    const response = await axios.get(API_URL + 'admin/getUnverifiedEvents');
    return response.data;
}

export const EventStatus = {
    REJECTED: "REJECTED",
    UNDER_REVIEW: "UNDER_REVIEW",
    NEEDS_RESUBMISSION: "NEEDS_RESUBMISSION",
    ONGOING: "ONGOING",
    COMPLETED: "COMPLETED",
    CANCELED: "CANCELED"
}

//Verify Event
const verifyEvent = async (eventId) => {
    const body = {
        eventId: eventId,
        eventStatus: EventStatus.ONGOING
    }
    const response = await axios.post(API_URL + 'admin/updateEventStatus', body);
    console.log(response.data)
    return response.data;
}


//Reject Event
const rejectEvent = async (eventId) => {
    const body = {
        eventId: eventId,
        eventStatus: EventStatus.REJECTED
    }
    const response = await axios.post(API_URL + 'admin/updateEventStatus', body);
    console.log(response.data)
    return response.data;
}


export { loadEvents, verifyEvent, rejectEvent }