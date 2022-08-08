import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import "./eventInfo.css"
import { BiTime } from 'react-icons/bi'
import { loadAnEvent } from '../../../services/event/eventService';
import ImageSlider from '../../../components/event/infopage/imageCarousel';
import BidForm from '../../../components/forms/makebid/BidForm';
import BidHistoryPanel from '../../../components/event/infopage/bidHistory';
import moment from "moment";
import {toast} from "react-toastify";

function EventInfo() {

    const [event, setEvent] = useState(false);
    const [timeRemaining, setTimeRemaining] = useState("");
    const [websocket, setWebsocket] = useState(null);
    const [loading, setLoading] = useState(false);
    const [subscribed, setSubscribed] = useState(false);

    const { eventId } = useParams();

    useEffect(() => {
        let ws = new WebSocket("ws://localhost:3000/api/auction");
        ws.onopen = (event) => {
            console.log("Socket established");
        }
        ws.onmessage = function (message) {
            const json = JSON.parse(message.data);
            try {
                const action = json.action;
                switch (action) {
                    case "AUCTION_UPDATE":
                        setEvent(prevState => ({
                            ...prevState,
                            bidHistory: json.bidHistory
                        }));
                        break;
                    case "BID_QUEUE":
                        setLoading(false);
                        if (json.data.statusCode === 201) {
                            toast.info("Your bid has been queued...");
                        } else {
                            toast.error("There was an error while processing your bid")
                        }
                        break;
                    case "BID_SUCCESS":
                        toast.success("Bid has been successfully placed!");
                        break;
                }
                console.log(json);
            } catch (err) {
                console.log(err);
            }
        };
        setWebsocket(ws);
        return () => {
            ws.close();
        };
    }, []);

    useEffect(() => {
        loadAnEvent(eventId).then(async response => {
            setEvent(response);
        }).catch(err => {
            console.log(err)
            console.log(err.response)
            if (err.response.status / 100 === 4){
                console.error({message: err.response.data.msg})
            }
            else{
                console.error({message: "Something went wrong, please try again!"})
            }        
        })
    }, [eventId])

    useEffect(() => {
        if (event) {
            if (!subscribed) {
                subscribeToAuction();
                setSubscribed(true);
            }
            const interval = setInterval(() => {
                setTimeRemaining(getTimeRemaining());
            }, 1000);
            return () => clearInterval(interval);
        }
    }, [event, subscribed]);

    const subscribeToAuction = () => {
        //Subscribe to auction updates
        const sub = {"action": "AUCTION_SUBSCRIBE", "timeStamp": Date.now(), "data": {"aid": eventId}}
        websocket.send(JSON.stringify(sub));
    }

    const getTimeRemaining = () => {
        const seconds = moment.duration(moment(event.auctionEnd).diff(moment())).asSeconds()
        return seconds > 0 ? formatTime(Math.abs(seconds)) : "00:00:00";
    }

    const formatTime = (secs) => {
        let sec_num = parseInt(secs, 10)
        let hours   = Math.floor(sec_num / 3600)
        let minutes = Math.floor(sec_num / 60) % 60
        let seconds = sec_num % 60

        return [hours,minutes,seconds]
            .map(v => v < 10 ? "0" + v : v)
            .filter((v,i) => v !== "00" || i > 0)
            .join(":")
    }
    const getDate = () => {
        const date = new Date(event.date).toDateString().split(' ');
        return date[0] + ' ' + date[1] + ' ' + date[2]
    }

    const getTime = () => {
        return new Date(event.date).toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    }


    return (
        <div className="container-fluid w-100 h-100">
            {!event && <h1 className="text-center mt-5">The event is not found</h1>}
            {event &&
                <div className="m-5">
                    <h1 className='m-1 text-uppercase fw-bolder'>{event.title}</h1>
                    <div className='d-flex flex-row mb-3'>
                        <h4 className='m-1 text-muted'>{getDate()}</h4>
                        <h4 className='m-1 text-muted'>{" · "}</h4>
                        <h4 className='m-1 text-muted'>{getTime()}</h4>
                        <h4 className='m-1 text-muted'>{" · "}</h4>
                        <h4 className='m-1 text-muted'>{event.location.city + ", " + event.location.street}</h4>
                    </div>
                    <div className="h5" style={{color: "dodgerblue"}}>{event.tags.map(tag => {if (tag!=="") return "#" + tag + " " })}</div>
                    <div className="justify-content-between">
                        <div className='row'>
                            <div className='col-md-6 mb-5'>
                                <ImageSlider images={event.images}></ImageSlider> 
                                <hr></hr>
                                <div className='text-secondary mt-5 mb-3'>Description</div>
                                <div className='h5 mb-5'>{event.description}</div>
                                <hr></hr>
                                <div id="bidhistory">
                                    <BidHistoryPanel bids={event.bidHistory}></BidHistoryPanel>
                                </div>
                            </div> 
                            <div id="sticky-form" className='col-md-5 offset-md-1 px-0 sticky-top align-self-start' style={{background: "white"}}>
                                <BidForm bids={event.bidHistory} eventId={eventId} websocket={websocket} setLoading={setLoading} loading={loading}></BidForm>
                                <div id="time-card" className='card my-5'>
                                    <div className="card-body">
                                        <div className="h5 m-3"><BiTime></BiTime> Locked in: <span style={{color: "red"}}>{timeRemaining}</span></div>
                                    </div>
                                </div>
                                <div id="eventinfo-card" className='card my-5'>
                                    <div className="card-body">
                                        <div className='h5 m-3'>{getDate() + " " + getTime()}</div>
                                        <div className='h5 m-3 fst-italic'>{event.location.city + ", " + event.location.street + ", " + 
                                        event.location.country + ", " + event.location.postalCode}</div>
                                    </div>
                                </div>
                                <div id="organizer-card" className='card my-5'>
                                    <div className="card-body">
                                        <div className='h5 m-3'>Sold by:  <a href="organizerPage" target="_blank" className='text-primary'>{event.organizerName}</a></div>
                                    </div>
                                </div>
                            </div> 
                        </div>
                        
                    </div>

                </div>
            }
        </div>
    )
}

export default EventInfo