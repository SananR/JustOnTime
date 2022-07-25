import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai'
import './uploadImage.css'

function UploadImage() {

    const [eventImages, setEventImages] = useState([]);

    useEffect(() => {
        
    })

    const hiddenImageInput = React.useRef(null);
    const addImageClicked = (e) => {
        e.preventDefault()
        hiddenImageInput.current.click()
    }

    const addImage = (e) => {
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
            return <div className="m-3 img-card col-sm-3" key={image.name}>
                        <img className="w-100" src={URL.createObjectURL(new Blob([image], {type:"image/jpeg"}))} alt="EventImage"/>
                        <div className='' style={{backgroundColor: "red"}}></div>
                    </div>
        })
    }

    return (
        <div>
            <div className="m-5 container-fluid">
                <div className='row images-container'>                
                    {renderImages()}
                    <input className='m-3 col-sm-3 d-none' ref={hiddenImageInput} type="file" accept="image/gif, image/jpeg, image/png" name="eventImage" onChange={addImage} />
                    <div type="button" className='m-3 mr-5 img-card btn btn-secondary col-sm-3' style={{"background": "red"}} onClick={addImageClicked}>
                            <div style={{'background': "blue"}}><AiOutlinePlus/>Click here to add images</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UploadImage