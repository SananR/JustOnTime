import React, {useState} from "react";
import { useEffect } from "react";
import {Modal} from 'react-bootstrap';
import VerifyEventForm from "../../components/admin/verifyEvent/VerifyEventForm";

import VerifyOrganizerForm from "../../components/admin/verifyOrganizer/VerifyOrganizerForm";


function AdminDashboard() {
    const [show, setShow] = useState(false);
    const [popupText, setPopupText] = useState("");
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onDeleteNode = (text) => {
        setPopupText(text)
    }

    useEffect(() => {
        if(popupText === "") handleClose()
        else handleShow()
    },[popupText])

    return (
        <div className="AdminDashboard">
            <Modal show={show} centered onHide={handleClose}>
                <Modal.Header closeButton style={{padding:"3rem 2rem 3rem 2rem"}}>
                <Modal.Title>{popupText}</Modal.Title>
                </Modal.Header>
            </Modal>

            <div id="content">
                <VerifyOrganizerForm onDeleteNode={onDeleteNode}/>
                <VerifyEventForm onDeleteNode={onDeleteNode}/>
            </div>

        </div>
    );
}

export default AdminDashboard