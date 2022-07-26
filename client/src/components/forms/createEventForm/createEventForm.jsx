import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FaUserAlt, FaLock} from 'react-icons/fa'
import CreateEventFormInputField from "./createEventFormInput/createEventFormInputField";
import Spinner from "../../spinner/Spinner";
import { forwardRef } from 'react';
import DatePickerField from './datePickerInput/datePickerInput';

function CreateEventForm(props) {
    return (<div>
        <form onSubmit={props.onSubmit} className="w-100 d-flex justify-content-center align-items-center">
            <div className="form-group col-12 container">
                <div className='row'>
                    <CreateEventFormInputField
                        error={props.error.titleError}
                        name="title"
                        className="col-sm-6"
                        onChange={props.onChange}
                        type="email"
                        label="Event Title"
                        errorMargin="90%"
                    />                    
                    <DatePickerField className="" onChange={props.onChangeDateTime} dateTime={props.dateTime}/>
                    <CreateEventFormInputField
                        error={props.error.descriptionError}
                        className="col-sm-12"
                        name="description"
                        style={{"height": "100px"}}
                        onChange={props.onChange}
                        label="Event Description"
                        errorMargin="90%"
                    />
                </div>

            </div>
        </form>
    </div>
)}

export default CreateEventForm