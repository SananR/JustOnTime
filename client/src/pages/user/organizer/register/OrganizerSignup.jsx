import React, {useState} from 'react'
import {
    OrganizerRegisterApproval,
    OrganizerRegisterBusiness,
    OrganizerRegisterEmailConfirmation
} from "../../../../components/forms/organizer/signup/OrganizerSignupForms";

import "./organizerSignup.css"

function OrganizerRegisterProgress(props) {

    function ProgressBarItem(props) {
        return (
            <>
                {props.filled && <h2 className="progress-heading text-danger text-center mt-5">{props.text}</h2>}
                {!props.filled && <h2 className="progress-heading text-muted text-center mt-5">{props.text}</h2>}
                {props.filled && <hr className="rounded progress-item-filled mx-5 mb-2 p-1"/>}
                {!props.filled && <hr className="rounded mx-5 mb-2 p-1"/>}
            </>
        )
    }

    return (
        <div className="row justify-content-center align-items-center mx-2">
            <div className="col flex-column justify-content-center align-items-center">
                <ProgressBarItem text="1. Email Confirmation" filled={props.stage >= 1 ? true : false}/>
            </div>
            <div className="col flex-column justify-content-center align-items-center">
                <ProgressBarItem text="2. Business Information" filled={props.stage >= 2 ? true : false}/>
            </div>
            <div className="col flex-column justify-content-center align-items-center">
                <ProgressBarItem text="3. Awaiting Approval" filled={props.stage >= 3 ? true : false}/>
            </div>
        </div>
    )
}

function OrganizerSignup(props) {

    const [formStep, setFormStep] = useState(2);

    function getCurrentPage() {
        switch (formStep) {
            case 1:
                return (<OrganizerRegisterEmailConfirmation/>)
                break;
            case 2:
                return (<OrganizerRegisterBusiness/>)
                break;
            case 3:
                return (<OrganizerRegisterApproval/>)
                break;
            default: break;
        }
    }

    return (
        <>
            <h1 className="text-center mt-5 "><strong>Let's create your profile</strong></h1>
            <OrganizerRegisterProgress stage={formStep}/>
            <div
                id="signup-container"
                className="gx-0 mt-5 mb-5 shadow-lg container-sm"
            >
                {getCurrentPage()}
                <div className="container-fluid row mt-5 mb-5 gx-0 gap-5 justify-content-center align-items-center">
{/*
                    {formStep == 3 && <button type="" id="back-button" className="mt-3 shadow-lg rounded-pill btn btn-block w-25 btn-secondary">BACK</button>}
*/}
                    {formStep == 2 && <button type="submit" id="submit-button" className="mt-3 shadow-lg rounded-pill btn btn-block w-25 btn-danger">CONTINUE</button>}
                </div>
            </div>
        </>
    )
}

export default OrganizerSignup;