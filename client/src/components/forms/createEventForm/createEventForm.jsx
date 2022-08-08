import React from 'react'
import "react-datepicker/dist/react-datepicker.css";
import {FaUserAlt, FaLock} from 'react-icons/fa'
import CreateEventFormInputField from "./createEventFormInput/createEventFormInputField";
import DatePickerField from './datePickerInput/datePickerInput';
import './createEventForm.css'
import { MdError } from 'react-icons/md';
import AddTagField from './addTagField/addTagField';

function CreateEventForm(props) {
    return (<div className='mb-5'>
        <form onSubmit={props.onSubmit} className="w-100 d-flex justify-content-center align-items-center">
            <div className="form-group col-sm-12">
                <div className='row my-2'>
                    <CreateEventFormInputField
                        error={props.error.nameError}
                        name="name"
                        className="col-sm-8"
                        onChange={props.onChange}
                        type="email"
                        label="Event Name"
                        errorMargin="0%"
                    /> 
                    <CreateEventFormInputField
                        error={props.error.initialPriceError}
                        name="initialPrice"
                        className="col-sm-4"
                        onChange={props.onChange}
                        type="number"
                        onwheel="this.blur()"
                        label="initialPrice"
                        errorMargin="90%"
                    />    
                </div>
                <div className='row my-2'>
                    <DatePickerField className="" onChange={props.onChangeDateTime} dateTime={props.dateTime}/>
                </div>
                <div className='row my-2'>
                    <div>
                        <label htmlFor="auction-end">Auction End Time</label>
                        <select name="auctionEndTimeGap" id="auction-end" className="form-select form-select-lg mb-3" defaultValue="24" onChange={props.onChange}  aria-label=".form-select-lg example">
                            <option value="6">6 hours before the event starts</option>
                            <option value="12">12 hours before the event starts</option>
                            <option value="24">24 hours before the event starts</option>
                            <option value="48">48 hours before the event starts</option>
                            <option value="72">72 hours before the event starts</option>
                        </select>
                    </div>

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
                        className="col-sm-6"
                        name="city"
                        onChange={props.onChange}
                        label="city"
                        errorMargin="90%"
                    />
                    <CreateEventFormInputField
                        error={props.error.countryError}
                        className="col-sm-6"
                        name="country"
                        onChange={props.onChange}
                        label="country"
                        errorMargin="90%"
                    />
                    <CreateEventFormInputField
                        error={props.error.postalCodeError}
                        className="col-sm-6"
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
                    <AddTagField
                        error={props.error.tagError}
                        name="tag"
                        onTagAddClciked={props.onTagAddClciked}
                        tags={props.tags}
                        label="tag"
                        errorMargin="90%"
                    />
                </div>
                {/* <div className='row my-2'>
                    <CreateEventFormInputField
                        error={props.error.tagError}
                        className="col-sm-12"
                        name="tag"
                        onChange={props.onChange}
                        label="tag"
                        errorMargin="90%"
                    />
                </div> */}
            </div>
        </form>
        {props.error.formError &&  <div className='position-absolute d-inline-flex'> 
                <MdError className="m-0 error-icon" style={{marginLeft: `${props.errorMargin}`}} color="red" size={25} /> 
                <p className="ms-2 text-danger z-index-10">{props.error.formError}</p>
            </div>}
    </div>
)}

export default CreateEventForm