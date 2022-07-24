import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai'

function UploadImage() {

    const [eventImages, setEventImages] = useState([]);

    useEffect(() => {
        
    })

    const addImageClicked = (e) => {
        const imageFiles = eventImages.concat(e.target.files[0])
        console.log(imageFiles)
        setEventImages(imageFiles)
    }

    const renderImages = () => {
        eventImages.forEach(image => {
            console.log(image)
        })
        return eventImages.map(image => {
            console.log(image)
            return <div className="m-2 card col-sm-3" key={image.name}>
                        <img className="card-img-top w-100" src={URL.createObjectURL(new Blob([image], {type:"image/jpeg"}))} alt="EventImage"/>
                        <div className='' style={{backgroundColor: "red"}}></div>
                    </div>
        })
    }

    return (
        <div>
            <div className="m-5 container-fluid">
                <div className='row'>                
                    {renderImages()}
                    <input type="file" accept="image/gif, image/jpeg, image/png" name="eventImage" onChange={addImageClicked} />
                    <div type="button" className='m-2 mr-5 btn btn-secondary col-sm-3'  onClick={addImageClicked}><AiOutlinePlus/></div>
                </div>

            </div>
        </div>
    )
}

export default UploadImage