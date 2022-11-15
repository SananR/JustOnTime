import React, { useState } from 'react'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { forwardRef } from 'react';
import './datePickerInput.module.css'


const DatePickerInput = forwardRef(({ value, onClick }, ref) => (
    <div className={`position-relative form-floating col-sm-8 my-3 mx-2`} >
            <input name="dateTime" id="date-field" label="Date" className="px-3 form-control form-control-lg" onClick={onClick} ref={ref} value={value} />
            <label htmlFor="date-field" className='px-4'>Date</label>
        </div>
  ));



const DatePickerField = (props) => {
    const [startDate, setStartDate] = useState(new Date());

    const isFuture = (date) => {
        const threeDaysLater = new Date()
        threeDaysLater.setDate(threeDaysLater.getDate() + 2)
        return date > threeDaysLater;
      };


    return (<DatePicker 
        selected={props.dateTime} 
        onChange={props.onChange} 
        className={`${props.className}`} 
        customInput={<DatePickerInput />}
        filterDate={isFuture}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"/>)
}

export default DatePickerField