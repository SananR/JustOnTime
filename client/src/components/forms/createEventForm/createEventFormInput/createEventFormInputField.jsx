import React from 'react'

import {MdError} from "react-icons/md"

import './createEventFormInputField.css'


function CreateEventFormInputField(props) {
    return (
        <div className={`position-relative form-floating my-4 ${props.className}`}>
            <input id="input-field" name={props.name} onChange={props.onChange} onWheel={e => e.target.blur()} type={props.type} value={props.value} placeholder={props.label} className="px-3 form-control form-control-lg h-100"/>
            <label htmlFor="input-field" className='px-4'>{props.label}</label>
            {props.error && <div className='position-absolute d-inline-flex'> 
                <MdError className="m-0 error-icon" style={{marginLeft: `${props.errorMargin}`}} color="red" size={25} /> 
                <p className="ms-2 text-danger z-index-10">{props.error}</p>
            </div>}
        </div>
    );
}

export default CreateEventFormInputField