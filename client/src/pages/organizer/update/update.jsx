import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './update.css'
import logo from '../../../logo_cropped.png'

function OrganizerUpdate() {
    const [state, setState] = useState({})
    const navigate = useNavigate()
	const eventId = window.location.pathname.split("/").pop()

    useEffect(() => {
        const fetchEvents = async () => {
            setState(await axios.get('/api/event/organizerEvents'));
        }
        fetchEvents();
		// uncomment line below once organizer id is connected to URI
		// setState(state.events.filter(event => event.id === eventId));
    }, [])
	
	const handleUpdate = (e) => {
        e.preventDefault();
        let data = [...e.currentTarget.elements]
            .filter((field) => field.type !== "submit")
            .map((field) => {
                return {
                    [field.id]: field.value,
                };
            });
		
		for(const field of data) {
			if (field.value === "") {
				if (["street", "city", "country", "postalCode"].includes(field.id)) {
					field.value = (state["address." + field.id])
				}
				else {
					field.value = (state[field.id])
				}
			}
		}
		data.unshift({'id': state.id})
		
		const updateEvent = async () => {
			await axios.put("/api/events/updateEvent", data)
		}
		updateEvent();

		navigate("/organizer/main");
	}

    return (
        <div>
            <div className="top">
                <h1 id="title"> Update Event </h1>
            </div>
            <div className="list">
                {/* uncomment lines below once organizer id is connected to URI */}
                {/* {
                    state.map(event =>
						<div>
						<button className="event" onClick={() => navigate("/organizer/events/" + event.id)}>
							<img src={event.eventImage_path} height="200" width="50"></img><br/>
							{event.name}<br/>
							{event.time}<br/>
							{event.address.street}<br/>
							{event.address.city}<br/>
							{event.address.country}
						</button>
						</div>
                    )
                } */}

                {/* remove once organizer id is connected to URI */}
                <button className="event" onClick={() => navigate("/organizer/events/1")}>
                    <img id="logo" src={logo} alt='JustOnTime' width="200" height="50"/><br/>
                    Event 1<br/>
                    January 1, 2022<br/>
                    6:00 p.m.<br/>
                    123 Main Street<br/>
                    Toronto<br/>
                    Canada
                </button>
            </div>

			<form id="form" onSubmit={handleUpdate}>
				<table>
					<tr>
						<td><label for="name" class="label">Name: </label></td>
						<td><input type="text" id="name"></input></td>
					</tr>
					<tr>
						<td><label for="description" class="label">Description:</label></td>
						<td><input type="text" id="description"></input></td>
					</tr>
					<tr>
						<td><label for="street" class="label">Street:</label></td>
						<td><input type="text" id="street"></input></td>
					</tr>
					<tr>
						<td><label for="city" class="label">City:</label></td>
						<td><input type="text" id="city"></input></td>
					</tr>
					<tr>
						<td><label for="country" class="label">Country:</label></td>
						<td><input type="text" id="country"></input></td>
					</tr>
					<tr>
						<td><label for="postalCode" class="label">Postal Code:</label></td>
						<td><input type="text" id="postalCode"></input></td>
					</tr>
					<tr>
						<td><label for="path" class="label">Image Path:</label></td>
						<td><input type="file" id="path" name="Image" accept="image/*"></input></td>
					</tr>
				</table>
				<div class="text-center">
				<input type="submit" id="submit"></input>
				</div>
			</form>
        </div>
    );
}

export default OrganizerUpdate