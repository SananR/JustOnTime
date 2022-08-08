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
                bidHistory: event.bidHistory,
                auctionEnd: event.auctionEnd
            }
        });
        return data;
    }
}

export const loadOrganizerEvents = async (userID) => {
    const response = await axios.get('/api/event/organizerEvents?id=' + userID);
    if (response.data) {
        const data =  response.data.events.map((event) => {
            return {
                id: event.id,
                title: event.name,
                date: event.date,
                time: event.time,
                location: event.location,
                bidHistory: event.bidHistory,
                auctionEnd: event.auctionEnd,
                status: event.status
            }
        });
        return data;
    }}

//Get searched events
export const loadSearchedEvents = async (searchTerm) => {
    const response = await axios.get(API_URL + `event/search/?searchTerm=${searchTerm}`);
    if (response.data) {
        const data =  response.data.map((event) => {
            console.log(event.bidHistory);
            return {
                id: event.id,
                title: event.name,
                date: event.date,
                time: event.time,
                location: event.location,
                bidHistory: event.bidHistory,
                auctionEnd: event.auctionEnd
            }
        });
        console.log(data)
        return data;
    }
    else {
        return {}
    }
}


//Possibly add organizer information(name)
export const loadAnEvent = async (id) => {
    const response = await axios.get(API_URL + `event/getAnEvent?id=${id}`);
    if (response.data) {
        const event = response.data
        if (event.eventInfo.status !== EventStatus.ONGOING){
            return false
        }
        /*if(event.bidHistory.length !== 0){
            const maxBet = event.bidHistory.reduce((prev, curr) => {
                return (prev.bidPrice > curr.bidPrice) ? prev : curr
            })
        }*/
        const allimages = [event.eventImagePath].concat(event.ImagePathArray);
        return {
            id: event._id,
            title: event.eventInfo.name,
            description: event.eventInfo.description,
            date: event.eventInfo.date,
            time: event.eventInfo.time,
            location: event.eventInfo.address,
            tags: event.tags,
            bidHistory: event.bidHistory,
            organizerId: event.organizerId,
            organizerName: event.organizerName,
            auctionEnd: event.eventInfo.auctionEnd,
            images: allimages
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

export const addEvent = async (body) => {
    console.log("Auction ends: " + body.auctionEnd);
    const headers = {
        'Content-Type': 'multipart/form-data'
    }
    try {
        const response = await axios.post(API_URL + `event`, body, {
            headers: headers,
        });
        console.log("success")
        return {success: true}
        
    } catch (e){
        console.error(e)
        return {success: false, message: e.response.data.message}
    }

}
