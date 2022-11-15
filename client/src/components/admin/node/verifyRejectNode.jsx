import React, {useState} from "react";
import {Modal} from 'react-bootstrap';
import './verifyRejectNode.module.css'

function VerifyRejectNode(props){

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <div id="verify-reject-node-container" className="mt-2 mb-2 shadow-sm container" >
            <div className="row p-3" onClick={handleShow}>            
                <p id="verify-reject-node-first-field" className="col m-2 text-center my-auto overflow-auto hide-scroll-bar">{props.firstField}</p>
                <p id="verify-reject-node-second-field" className="col m-2 text-center my-auto overflow-auto hide-scroll-bar">{props.secondField}</p>
                <button id="verify-reject-node-button" className="col m-2 btn btn-outline-success" onClick={props.onClickVerify}>Verify</button>
                <button id="reject-reject-node-button" className="col m-2 btn btn-outline-danger" onClick={props.onClickReject}>Reject</button>
            </div>

            <Modal show={show} size="lg" centered onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Organizer Detail</Modal.Title>
                </Modal.Header>
                <Modal.Body className="p-2 overflow-auto"><pre>{JSON.stringify(props.object, null, 2)}</pre></Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </div>
    )
}

export default VerifyRejectNode