import React, {useState} from 'react'

import InputField from "../input/InputField";
import {useSelector} from "react-redux";
import {Button, Modal, OverlayTrigger, Tooltip} from "react-bootstrap";
import Spinner from "../../spinner/Spinner";

function BidForm(props) {

    const [formBid, setFormBid] = useState(0);
    const [formError, setFormError] = useState(false);
    const [confirmation, setConfirmation] = useState(false);

    const {user} = useSelector((state) => state.auth)

    const handleBidConfirm = () => {
        closeConfirmation();
        const bid = {
            "action": "BID_PLACE",
            "timeStamp": Date.now(),
            "data": {
                "uid": user._id,
                "aid": props.eventId,
                "bidAmount": formBid
            }
        };
        props.websocket.send(JSON.stringify(bid));
        props.setLoading(true);
    }

    const getCurrentBid = () => {
        return props.bids.length > 0 ? props.bids[props.bids.length - 1].bidAmount : 0;
    }

    const closeConfirmation = () => setConfirmation(false);


    const getBidConfirmation = () => {
        return (
            <Modal className="h-75" show={confirmation} size="md" centered>
                <Modal.Body>
                    <div className="pt-3 px-5 container-fluid row justify-content-center align-items-center">
                        <h3 className="text-center">Bid Confirmation</h3>
                        <p className="pt-5 text-center">Amount</p>
                        <h1 className="pt-3 text-danger text-center">${formBid}</h1>
                        <div className="gap-3 pt-2 mt-5 d-flex flex-row justify-content-center align-items-center">
                            <Button className="col-lg" variant="secondary" onClick={closeConfirmation}>Cancel</Button>
                            <Button className="col-lg"  variant="outline-success" onClick={handleBidConfirm}>Place My Bid</Button>
                        </div>
                    </div>
                </Modal.Body>
            </Modal>
        )
    }

    const onPlaceBid = (e) => {
        e.preventDefault();
        //No user
        if (!user) return;
        //Invalid bid amount
        if (formBid < getCurrentBid()+1) {
            const minBid = getCurrentBid() + 1;
            setFormError("Bid must be $" + minBid + " or higher.");
            return;
        } else setFormError(false);
        setConfirmation(true);
    }
    const onChange = (e) => {
        setFormBid(Number(e.target.value));
    }

    return (
        <div className="position-relative py-5 shadow container">
            {getBidConfirmation()}
            <Spinner className="top-0" color={"#ff6178"} loading={props.loading} size={75} />
            <div className='row align-items-center'>
                <div className='col-sm-3 text-center'>Current bid:</div>
                <div className='col-sm-4 h3 fw-bolder'>${getCurrentBid()}</div>
                <div className='col-sm-5 h5 ' style={{color: "dodgerblue"}}><a href="#bidhistory">[{props.bids.length} bids]</a></div>
            </div>
            <div className='row'>
                <form onSubmit={onPlaceBid} className="w-100 d-flex flex-column justify-content-center align-items-center">
                    <div className="form-group col-md-8">
                        <InputField
                            name="bidamount"
                            type="number"
                            onChange={onChange}
                            min={getCurrentBid()+1}
                            value={getCurrentBid()+1}
                            pattern="^\d+(?:\.\d{1,2})?$"
                            placeholder="Bid Amount"
                            errorMargin="40%"
                            error={formError}
                            className="text-center"
                        />
                        {!formError && <div className='text-center m-2 text-secondary'>Enter ${getCurrentBid()+1} or more</div>}
                        {user && <button className="mt-3 shadow rounded-pill btn btn-block w-100 btn-danger">Place bid</button>}
                        {!user &&
                            <OverlayTrigger
                                placement="bottom"
                                overlay={<Tooltip id="tooltip-disabled">Create an account in order to place bids on events</Tooltip>}>
                                <div>
                                    <button disabled className="mt-3 shadow rounded-pill btn btn-block w-100 btn-danger" style={{ pointerEvents: 'none' }}>Place bid</button>
                                </div>
                            </OverlayTrigger>}
                    </div>
                </form>
            </div>
        </div>
    );

}

export default BidForm