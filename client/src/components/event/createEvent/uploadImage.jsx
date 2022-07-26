import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai'
import { BiPhotoAlbum } from 'react-icons/bi'
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

    const removeImage = (imageName) => {
        console.log(imageName)
        const updatedImages = eventImages.filter((image) => image.name !== imageName)
        setEventImages(updatedImages)
    }

    const renderImages = () => {
        eventImages.forEach(image => {
            console.log(image)
        })
        return eventImages.map(image => {
            console.log(image)
            return  <div className="m-3 img-card col-sm-3" key={image.name+":"+image.lastModified}> 
                        <span className="clickable close-icon mt-2" data-effect="fadeOut" onClick={() => removeImage(image.name)}><AiFillCloseCircle color={"grey"} size={35}/></span>
                        <img className="w-100" src={URL.createObjectURL(new Blob([image], {type:"image/jpeg"}))} alt="EventImage"/>
                        <div className='' style={{backgroundColor: "red"}}></div>
                    </div>
        })
    }

    return (
        <div>
            <div className="my-5 container shadow-lg p-3 mb-5 bg-white rounded">
                <div className='h3'>Images  <span className='h5'>({eventImages.length}/5)</span></div>
                <div className='row'>                
                    {renderImages()}
                    <input className='d-none' ref={hiddenImageInput} type="file" accept="image/gif, image/jpeg, image/png" name="eventImage" onChange={addImage} />
                    <div className='m-3 mr-5 img-card-add btn btn-secondary col-sm-3' onClick={addImageClicked}>
                            <div className=''><AiOutlinePlus size={30}/><BiPhotoAlbum size={30}/></div>
                            <div className='h5'>Click here to add images</div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default UploadImage