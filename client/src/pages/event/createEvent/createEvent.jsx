import React, {useEffect, useState} from 'react'
import UploadImage from '../../../components/event/createEvent/uploadImage';
import CreateEventForm from '../../../components/forms/createEventForm/createEventForm';

function CreateEvent() {

    const [eventImages, setEventImages] = useState([]);
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
        dateTime: defaultDateTime
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
            <UploadImage></UploadImage>
            <CreateEventForm dateTime={formData.dateTime} onSubmit={onSubmit} onChange={onChange} onChangeDateTime={onChangeDateTime} error={formError}></CreateEventForm>
        </div>
    )
}

export default CreateEvent