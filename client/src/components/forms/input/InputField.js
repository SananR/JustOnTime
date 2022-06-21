import React from 'react'

import './inputField.css'


function InputField(props) {
    return (
        <div className={`position-relative ${props.className}`} >
            {props.icon}
            <input id="input-field" type={props.type} className="px-5 rounded-pill form-control form-control-lg" placeholder={props.placeholder}/>
        </div>
    );
}

export default InputField