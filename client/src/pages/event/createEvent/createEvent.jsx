import React, {useEffect, useState} from 'react'
import {useNavigate} from "react-router-dom";
import Spinner from "../../../components/spinner/Spinner";
import { addEvent } from '../../../services/event/eventService';
import UploadImage from '../../../components/event/createEvent/uploadImage';
import CreateEventForm from '../../../components/forms/createEventForm/createEventForm';
import './createEvent.css'
import Alert from 'react-bootstrap/Alert';
import { useSelector } from 'react-redux';
import moment from 'moment';

import { InputValidator } from '../../../util/validation/InputValidator';

function CreateEvent() {
    const navigate = useNavigate()
    const [eventImages, setEventImages] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const [loading, setLoading] = useState(false);

    const addImage = (e) => {
        const imageFiles = eventImages.concat(e.target.files[0])
        setEventImages(imageFiles)
    }

    const removeImage = (imageName) => {
        const updatedImages = eventImages.filter((image) => image.name !== imageName)
        setEventImages(updatedImages)
    }

    const [formError, setFormError] = useState({
        nameError: false,
        descriptionError: false,
        dateTimeError: false,
        initialPriceError: false,
        tagError: false,
        streetError: false,
        cityError: false,
        countryError: false,
        postalCodeError: false,
        imageError: false,
        formError: false
    })

    const defaultDateTime = new Date()
    defaultDateTime.setDate(defaultDateTime.getDate() + 6);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        initialPrice: -1,
        tag: [],
        dateTime: defaultDateTime,
        auctionEndTimeGap: "6",
        street: '',
        city: '',
        country: '',
        postalCode: ''
    })

    const {name, description, initialPrice, tag, dateTime, auctionEndTimeGap,street, city, country, postalCode} = formData;

    const user = useSelector((state) => state.auth.user);
    useEffect(() => {
        if(user && user.userType == "Customer"){
            navigate("/")
        }
    })
    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
        console.log(formData)
        console.log(dateTime.toISOString())
    }

    const onChangeDateTime = (newDateTime) => {
        setFormData((prevState) => ({
            ...prevState,
            dateTime: newDateTime,
        }))
    }

    const submiEvent = async (e) => {
        setLoading(true)

        let nameValid = new InputValidator(name).minLength(3).maxLength(50).isValid;
        let descriptionValid = new InputValidator(description).minLength(20).isValid;
        let initialPriceValid = new InputValidator(initialPrice).isInRange(0, 100000).isValid;
        let tagValid = new InputValidator(tag).minLength(0).maxLength(10).isValid;
        let streetValid = new InputValidator(street).minLength(3).maxLength(50).isValid;
        let cityValid = new InputValidator(street).minLength(3).maxLength(50).isValid;
        let countryValid = new InputValidator(country).minLength(3).maxLength(50).isValid;
        let postalCodeValid = true;
        let imageValid = new InputValidator(eventImages).minLength(1).maxLength(5).isValid;

        setFormError((prevState) => ({
            ...prevState,
            nameError: nameValid ? false : "Enter a valid title (event title must be between 3 and 50 characters long)",
            descriptionError: descriptionValid ? false : "Enter a valid description. (description must be least 20 characters long)",
            initialPriceError: initialPriceValid ? false : "Enter a valid price",
            tagError: tagValid ? false : "Enter a valid tags",
            streetError: streetValid ? false : "Enter a valid street name (street must be between 3 and 50 characters long)",
            cityError: cityValid ? false : "Enter a valid city name (city must be between 3 and 50 characters long)",
            countryError: countryValid ? false : "Enter a valid country name (country must be between 3 and 50 characters long)",
            postalCodeError: postalCodeValid ? false : "Enter a valid postalCode",
            imageError: imageValid ? false : "Please select 1 to 5 images for your event",
            formError: false
        }))
        let formValid = nameValid && descriptionValid && initialPriceValid && tagValid && streetValid
             && countryValid && postalCodeValid && imageValid;
        if (formValid) {
            const dd = String(dateTime.getDate())
            const mm = String(dateTime.getMonth() + 1) 
            const yyyy = dateTime.getFullYear();
            var imagesBody = {}
            const date = yyyy + "/" + mm + "/" + dd;  

            const hours = String(dateTime.getHours()).padStart(2, "0") 
            const minutes = String(dateTime.getMinutes()).padStart(2, "0")
            const time = hours + ":" + minutes
            const mainImage = eventImages[0]
            const otherImages = eventImages.slice(1)
            if(otherImages.length != 0){
                imagesBody = otherImages.reduce((prev, curr, {}) => {
                    return {...prev, images: curr }
                })
            }
            const auctionEndTime = new Date(dateTime.getTime());
            auctionEndTime.setHours(auctionEndTime.getHours() - parseInt(auctionEndTimeGap));
            const body = {    
                name: name,
                description: description,
                initialPrice: initialPrice,
                time: time,
                date: date,
                street: street,
                city: city,
                country: country,
                postalCode: postalCode,
                auctionEnd: auctionEndTime.toISOString(),
                tags: tag,
                mainImage: mainImage,
                ...imagesBody
            }
            console.log(body)
            const addEventResult = await addEvent(body)
            try {
                if (addEventResult.success){
                    setShowAlert(true)
                } 
                else {
                    console.error(addEventResult.message[0])
                    addEventResult.message.forEach(error => {
                        const {value, msg, param, location} = error
                        setFormError((prevState) => ({
                            ...prevState,
                            [param+"Error"]: msg
                        }))
                    })
                }
            } catch (e) {
                setFormError((prevState) => ({
                    ...prevState,
                    ["formError"]: addEventResult.message
                }))
                console.error(e)
            }

        }
        setLoading(false)

    }

    return (
        <div className="m-5 container w-100 h-100"> 
            <Spinner color={"#ff6178"} loading={loading} size={75} />
            <div>
                <div className='h1'>Create New Event</div>
                    <hr></hr>
                    <UploadImage addImage={addImage} removeImage={removeImage} eventImages={eventImages} imageError={formError.imageError}></UploadImage>
                    <CreateEventForm dateTime={formData.dateTime} onChange={onChange} onChangeDateTime={onChangeDateTime} error={formError}></CreateEventForm>
                    <div className="row justify-content-center">
                        <button type="submit" id="create-event-submit-button" onClick={submiEvent} className="mt-3 justify-self-center shadow-lg rounded-pill btn btn-block w-100 btn-primary">Create Event</button>
                    </div> 
            </div> 
            {showAlert && 
                <div className="position-fixed top-0 start-0 w-100 h-100" style={{"background": "rgba(0,0,0, .8)", "zIndex": "1000"}}> 
                    <div>Where are tou</div>
                    <div className='position-fixed top-50 start-50 translate-middle'>
                        <Alert variant="success" onClose={() => {setShowAlert(false); navigate("/")}} dismissible>
                            The event is successfully created! <br></br>
                            Please wait for few business days for the event to be verified
                        </Alert>
                    </div>
                </div>
            }
        </div>
    )
}

export default CreateEvent