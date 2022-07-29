import React, {useEffect, useState} from 'react'
import UploadImage from '../../../components/event/createEvent/uploadImage';
import CreateEventForm from '../../../components/forms/createEventForm/createEventForm';

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
        timeError: false,
        initialPriceError: false,
        tagError: false,
        formError: false
    })

    const defaultDateTime = new Date()
    defaultDateTime.setDate(defaultDateTime.getDate() + 6);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        initialPrice: 0,
        tag: [],
        dateTime: defaultDateTime,
        street: '',
        city: '',
        country: '',
        postalCode: ''
    })

    const {firstName, lastName, email, password, password2} = formData;


    // const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth) 

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

    const onSubmit = (e) => {
    }

    return (
        <div className="m-5 container w-100 h-100">
            <div className='h1'>Create New Event</div>
            <hr></hr>
            <UploadImage addImage={addImage} removeImage={removeImage} eventImages={eventImages}></UploadImage>
            <CreateEventForm dateTime={formData.dateTime} onSubmit={onSubmit} onChange={onChange} onChangeDateTime={onChangeDateTime} error={formError}></CreateEventForm>
        </div>
    )
}

export default CreateEvent