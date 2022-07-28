import React from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {FaUserAlt, FaLock} from 'react-icons/fa'
import CreateEventFormInputField from "./createEventFormInput/createEventFormInputField";
import Spinner from "../../spinner/Spinner";
import { forwardRef } from 'react';
import DatePickerField from './datePickerInput/datePickerInput';
import './createEventForm.css'

function CreateEventForm(props) {
    return (<div>
        <form onSubmit={props.onSubmit} className="w-100 d-flex justify-content-center align-items-center grid">
            <div className="form-group col-12 ">
                <div className='row my-2'>
                    <CreateEventFormInputField
                        error={props.error.titleError}
                        name="title"
                        className="col-sm-8"
                        onChange={props.onChange}
                        type="email"
                        label="Event Title"
                        errorMargin="0%"
                    /> 
                    <CreateEventFormInputField
                        error={props.error.initialPriceError}
                        name="initialPrice"
                        className="col-sm-4"
                        onChange={props.onChange}
                        type="number"
                        value="1"
                        label="initialPrice"
                        errorMargin="90%"
                    />    
                </div>
                <div className='row my-2'>
                    <DatePickerField className="" onChange={props.onChangeDateTime} dateTime={props.dateTime}/>
                </div>
                <div className='row my-2'>
                <CreateEventFormInputField
                    error={props.error.streetError}
                    className="col-sm-12"
                    name="street"
                    onChange={props.onChange}
                    label="street"
                    errorMargin="90%"
                />
                <CreateEventFormInputField
                    error={props.error.cityError}
                    className="col-sm-4"
                    name="city"
                    onChange={props.onChange}
                    label="city"
                    errorMargin="90%"
                />
                <CreateEventFormInputField
                    error={props.error.countryError}
                    className="col-sm-4"
                    name="country"
                    onChange={props.onChange}
                    label="country"
                    errorMargin="90%"
                />
                <CreateEventFormInputField
                    error={props.error.postalCodeError}
                    className="col-sm-4"
                    name="postalCode"
                    onChange={props.onChange}
                    label="postalCode"
                    errorMargin="90%"
                />
                </div>
                <div className='row my-2' style={{"height": "200px"}}>
                    <CreateEventFormInputField
                        error={props.error.descriptionError}
                        className="col-sm-12"
                        name="description"
                        style={{"height": "300px"}}
                        onChange={props.onChange}
                        label="Event Description"
                        errorMargin="90%"
                    />
                </div>
                <div className='row my-2'>
                    <CreateEventFormInputField
                        error={props.error.tagError}
                        className="col-sm-12"
                        name="tag"
                        onChange={props.onChange}
                        label="tag"
                        errorMargin="90%"
                    />
                </div>
            </div>
        </form>
    </div>
)}

export default CreateEventForm