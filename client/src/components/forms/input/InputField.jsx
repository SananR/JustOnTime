import React from 'react'

import {MdError} from "react-icons/md"

import './inputField.module.css'


function InputField(props) {
    return (
        <div className={`position-relative ${props.className}`} >
            {props.icon}
            <input
                id="input-field"
                name={props.name}
                onChange={props.onChange}
                type={props.type}
                className="px-5 rounded-pill form-control form-control-lg"
                placeholder={props.placeholder}
                min={props.min | 0}
            />
            {props.error && <MdError className="error-icon position-absolute" style={{marginLeft: `${props.errorMargin}`}} color="red" size={25} />}
            {props.error && <p className="ms-2 text-danger">{props.error}</p>}
        </div>
    );
}

export default InputField