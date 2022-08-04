import React from 'react'

import InputField from "../input/InputField";
import {useEffect} from "react";

function MakeBidForm(props) {


    return (
        <div id="makeabid-container" className="py-5 shadow container">
            <div className='row align-items-center'>                                
                <div className='col-sm-3 text-center'>Current bid:</div>
                <div className='col-sm-4 h3 fw-bolder'>${props.currentBid}</div>
                <div className='col-sm-5 h5 ' style={{color: "dodgerblue"}}><a href="#bidhistory">[{props.bids} bids]</a></div>
            </div>
            <div className='row'>
                <form onSubmit={props.onSubmit} className="w-100 d-flex flex-column justify-content-center align-items-center">
                    <div className="form-group col-md-8">
                        <InputField
                            name="bidamount"
                            onChange={props.onChange}
                            type="number"
                            min={props.currentBid+1}
                            value={props.currentBid+1}
                            pattern="^\d+(?:\.\d{1,2})?$"
                            placeholder="Bid Amount"
                            errorMargin="20%"
                            className="text-center"
                        />
                        <div className='text-center m-2 text-secondary'>Enter ${props.currentBid+1} or more</div>
                        <button type="submit" id="submit-button" className="mt-3 shadow rounded-pill btn btn-block w-100 btn-danger">Place bid</button>
                    </div>
                </form>
            </div>
        </div>
    );

}

export default MakeBidForm