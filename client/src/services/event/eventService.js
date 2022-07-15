import axios from 'axios'
import { EventStatus } from '../admin/verifyEventService';

const API_URL = '/api/'

//Get public events
export const loadEvents = async () => {
    const response = await axios.get(API_URL + 'event');
    if (response.data) {
        const data =  response.data.events.map((event) => {
            return {
                id: event.id,
                title: event.name,
                date: event.date,
                time: event.time,
                location: event.location,
                currentBid: 0,
                previousBid: 0,
                timeRemaining: "00:00:00"
            }
        });
        return data;
    }
}

//Possibly add organizer information(name)
export const loadAnEvent = async (id) => {
    const response = await axios.get(API_URL + `event/getAnEvent?id=${id}`);
    if (response.data) {
        const event = response.data
        if (event.eventInfo.status != EventStatus.ONGOING){
            return false
        }
        const maxBet = event.bidHistory.reduce((prev, curr) => {
            return (prev.bidPrice > curr.bidPrice) ? prev : curr
        })
        return {
            id: event._id,
            title: event.eventInfo.name,
            description: event.eventInfo.description,
            date: event.eventInfo.date,
            time: event.eventInfo.time,
            location: event.eventInfo.address,
            tags: event.tags,
            bids: event.bidHistory,
            organizerId: event.organizerId,
            organizerName: event.organizerName,
            currentBid: maxBet,
            timeRemaining: "00:00:00"
        }
    }
}

export const getEventImage = async(id) => {
    try {
        const response = await axios.get(API_URL + `event/getImage/?id=${id}`, {
            responseType: "blob"
        });
        return response.data;
    } catch (err) {
        console.error(err);
        return null;
    }

}