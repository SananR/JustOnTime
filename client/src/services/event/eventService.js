import axios from 'axios'

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