import React, {useEffect, useState} from 'react'
import { addEvent } from '../../../services/event/eventService';
import UploadImage from '../../../components/event/createEvent/uploadImage';
import CreateEventForm from '../../../components/forms/createEventForm/createEventForm';
import './createEvent.css'
import { InputValidator } from '../../../util/validation/InputValidator';

function CreateEvent() {

    const [eventImages, setEventImages] = useState([]);

    const addImage = (e) => {
        const imageFiles = eventImages.concat(e.target.files[0])
        console.log(imageFiles)
        setEventImages(imageFiles)
    }

    const removeImage = (imageName) => {
        console.log(imageName)
        const updatedImages = eventImages.filter((image) => image.name !== imageName)
        setEventImages(updatedImages)
    }

    const [formError, setFormError] = useState({
        titleError: false,
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
        title: '',
        description: '',
        initialPrice: 1,
        tag: [],
        dateTime: defaultDateTime,
        street: '',
        city: '',
        country: '',
        postalCode: ''
    })

    const {title, description, initialPrice, tag, dateTime, street, city, country, postalCode} = formData;


    useEffect(() => {})
    const onChange = (e) => {
        console.log(e)
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))

        console.log(formData)
    }

    const onChangeDateTime = (newDateTime) => {
        setFormData((prevState) => ({
            ...prevState,
            dateTime: newDateTime
        }))
    }

    const submiEvent = (e) => {
        let titleValid = new InputValidator(title).minLength(5).maxLength(30).isValid;
        let descriptionValid = new InputValidator(description).minLength(10).maxLength(200).isValid;
        let initialPriceValid = new InputValidator(initialPrice).isInRange(0, 100000).isValid;
        let tagValid = new InputValidator(tag).minLength(0).maxLength(10).isValid;
        let streetValid = new InputValidator(street).minLength(5).maxLength(100).isValid;
        let cityValid = new InputValidator(street).minLength(2).maxLength(100).isValid;
        let countryValid = new InputValidator(country).minLength(3).maxLength(30).isValid;
        let postalCodeValid = new InputValidator(postalCode).minLength(6).maxLength(15).isValid;
        let imageValid = new InputValidator(eventImages).minLength(1).maxLength(5).isValid;

        setFormError((prevState) => ({
            ...prevState,
            titleError: titleValid ? false : "Enter a valid title. (title must be between 5 to 30 charcters)",
            descriptionError: descriptionValid ? false : "Enter a valid description. (description must be between 10 to 200 charcters)",
            initialPriceError: initialPriceValid ? false : "Enter a valid price",
            tagError: tagValid ? false : "Enter a valid tags",
            streetError: streetValid ? false : "Enter a valid street name",
            cityError: cityValid ? false : "Enter a valid city name",
            countryError: countryValid ? false : "Enter a valid country name",
            postalCodeError: postalCodeValid ? false : "Enter a valid postalCode",
            imageError: imageValid ? false : "Please select 1 to 5 images for your event",
        
        }))
        let formValid = titleValid && descriptionValid && initialPriceValid && tagValid && streetValid
             && countryValid && postalCodeValid && imageValid;
        if (formValid) {
            const dd = String(dateTime.getDate())
            const mm = String(dateTime.getMonth() + 1) 
            const yyyy = dateTime.getFullYear();
            const date = yyyy + "/" + mm + "/" + dd;  

            const hours = String(dateTime.getHours()).padStart(2, "0") 
            const minutes = String(dateTime.getMinutes()).padStart(2, "0")
            const time = hours + ":" + minutes
            console.log(date )
            console.log(time)
            const mainImage = eventImages[0]
            const otherImages = eventImages.slice(1)
            const body = {    
                name: title,
                description: description,
                initialPrice: initialPrice,
                time: time,
                date: date,
                street: street,
                city: city,
                country: country,
                postalCode: postalCode,
                tags: tag,
                mainImage: mainImage,
                images: otherImages
            }
            addEvent(body)
        } else {
            console.log("no images")
        }
    }

    return (
        <div className="m-5 container w-100 h-100">
            <div className='h1'>Create New Event</div>
            <hr></hr>
            <UploadImage addImage={addImage} removeImage={removeImage} eventImages={eventImages} imageError={formError.imageError}></UploadImage>
            <CreateEventForm dateTime={formData.dateTime} onChange={onChange} onChangeDateTime={onChangeDateTime} error={formError}></CreateEventForm>
            <div class="row justify-content-center">
                <button type="submit" id="create-event-submit-button" onClick={submiEvent} className="mt-3 justify-self-center shadow-lg rounded-pill btn btn-block w-100 btn-primary">Create Event</button>
            </div>
        </div>
    )
}

export default CreateEvent