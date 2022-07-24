import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai'
import UploadImage from '../../../components/event/createEvent/uploadImage';

function CreateEvent() {

    const [eventImages, setEventImages] = useState([]);

    useEffect(() => {
        
    })

    const addImageClicked = (e) => {
        setEventImages(eventImages.concat(1))
    }

    const renderImages = () => {
        return eventImages.map(image => {
            return <div className="m-2 card col-sm-3">
                        <img className="card-img-top w-100" src={URL.createObjectURL(new Blob([image], {type:"image/jpeg"}))} alt="Card image cap"/>
                        <div className='' style={{backgroundColor: "red"}}></div>
                    </div>
        })
    }

    return (
        <div className="container-fluid w-100 h-100">
            <UploadImage></UploadImage>
        </div>
    )
}

export default CreateEvent