import React from 'react'

import {MdError} from "react-icons/md"

import './createEventFormInputField.css'


function CreateEventFormInputField(props) {
    return (
        <div className={`position-relative form-floating my-3 ${props.className}`}>
            <input id="input-field" name={props.name} onChange={props.onChange} type={props.type} value={props.value} placeholder={props.label} className="px-3 form-control form-control-lg h-100"/>
            <label for="input-field" className='px-4'>{props.label}</label>
            {props.error && <MdError className="error-icon position-absolute" style={{marginLeft: `${props.errorMargin}`}} color="red" size={25} />}
            {props.error && <p className="ms-2 text-danger">{props.error}</p>}
        </div>
    );
}

export default CreateEventFormInputField