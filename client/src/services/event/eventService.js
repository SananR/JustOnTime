import axios from 'axios'

const API_URL = '/api/'

//Get public events
const loadEvents = async () => {
    const response = await axios.get(API_URL + 'event');
    let id = 0;
    if (response.data) {
        return response.events.map((event) => {
            id++;
            return {
                id: id,
                title: event.name,
                date: event.date,
                time: event.time,
                location: event.location,
                currentBid: 0,
                previousBid: 0,
                timeRemaining: "00:00:00"
            }
        });
    }
}