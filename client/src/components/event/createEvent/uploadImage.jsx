import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom';
import { AiOutlinePlus, AiFillCloseCircle } from 'react-icons/ai'
import { BiPhotoAlbum } from 'react-icons/bi'
import './uploadImage.css'
import { MdError } from 'react-icons/md';

function UploadImage(props) {

    useEffect(() => {
        
    })

    const hiddenImageInput = React.useRef(null);
    const addImageClicked = (e) => {
        e.preventDefault()
        hiddenImageInput.current.click()
    }



    const renderImages = () => {
        return props.eventImages.map(image => {
            return  <div className="m-3 img-card col-sm-3" key={image.name+":"+image.lastModified}> 
                        <span className="clickable close-icon mt-2" data-effect="fadeOut" onClick={() => props.removeImage(image.name)}><AiFillCloseCircle color={"grey"} size={35}/></span>
                        <img className="w-100" src={URL.createObjectURL(new Blob([image], {type:"image/jpeg"}))} alt="EventImage"/>
                        <div className='' style={{backgroundColor: "red"}}></div>
                    </div>
        })
    }

    return (
        <div>
            <div className="my-5 container shadow-lg p-3 mb-5 bg-white rounded">
                <div className='h3'>Images  <span className='h5'>({props.eventImages.length}/5)</span></div>
                <div className='row'>                
                    {renderImages()}
                    <input className='d-none' ref={hiddenImageInput} type="file" accept="image/gif, image/jpeg, image/png" name="eventImage" onChange={props.addImage} />
                    <div className='m-3 mr-5 img-card-add btn btn-secondary col-sm-3' onClick={addImageClicked}>
                            <div className=''><AiOutlinePlus size={30}/><BiPhotoAlbum size={30}/></div>
                            <div className='h5'>Click here to add images</div>
                    </div>
                </div>
                {props.imageError && <div className='py-4 position-absolute d-inline-flex'> 
                    <MdError className="m-0 error-icon" style={{marginLeft: `${props.errorMargin}`}} color="red" size={25} /> 
                    <p className="ms-2 text-danger z-index-10">{props.imageError}</p>
                </div>}
            </div>
        </div>
    )
}

export default UploadImage