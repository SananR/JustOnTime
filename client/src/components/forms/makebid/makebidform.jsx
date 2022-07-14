import React from 'react'


import {FaUserAlt, FaLock} from 'react-icons/fa'
import InputField from "../input/InputField";
import GoogleButton from 'react-google-button'

function MakeBidForm(props) {
    return (
        <div id="makeabid-container" className="mt-5 mb-5 py-5 shadow container">
            <div className='row'>
                <form onSubmit={props.onSubmit} className="w-100 d-flex flex-column justify-content-center align-items-center">
                    <div className="form-group col-md-8">
                        <InputField
                            name="bidamount"
                            onChange={props.onChange}
                            type="number"
                            min={props.minBid}
                            value="0"
                            step="0.01"
                            pattern="^\d+(?:\.\d{1,2})?$"
                            placeholder="Bid Amount"
                            errorMargin="20%"
                            className="text-center"
                        />
                        <div className='text-center m-2 text-secondary'>Enter ${props.minBid} or more</div>
                        <button type="submit" className="mt-3 shadow rounded-pill btn btn-block w-100 btn-primary">Place bid</button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default MakeBidForm