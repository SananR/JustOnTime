import React from 'react'
import { useState } from 'react'

import {AiOutlinePlusCircle} from "react-icons/ai"
import {MdError} from "react-icons/md"
import TagNode from './tagNode'


function AddTagField(props) {
    const [tagText, setTagText] = useState("")
    const onChange = (e) => {
        setTagText(e.target.value)
    }

    const addClicked = (e) => {
        // e.preventDefualt()
        props.onTagAddClciked(tagText)
        setTagText("")
    }

    const renderTags = () => {
        return props.tags.map(tag => {
            console.log(tag)
            return (
                <TagNode text={tag} removeTag={props.removeTag}/>
            )
        })
    }
    return (
        <div className='container'>
            <div className='row align-items-center justify-content-space-between'>
                <label htmlFor="input-field" className=''>{props.label}</label>
                <div className={`col-sm-5 my-4 ${props.className} d-flex`}>
                    <input id="input-field" name={props.name} value={tagText} onChange={onChange} placeholder="enter tag here" className="px-3 form-control form-control-lg h-100"/>
                    {props.error && <div className='position-absolute d-inline-flex'> 
                        <MdError className="m-0 error-icon" style={{marginLeft: `${props.errorMargin}`}} color="red" size={25} /> 
                        <p className="ms-2 text-danger z-index-10">{props.error}</p>
                    </div>}
                    <button type="button" className="btn btn-labeled btn-secondary" onClick={addClicked}><AiOutlinePlusCircle size={25}></AiOutlinePlusCircle></button>
                </div>
                <div className='col-sm-7 d-flex'>
                    {renderTags()}
                </div>
            </div>
        </div>
    )
}

export default AddTagField