import React, {useEffect, useState} from 'react'
import {
    OrganizerRegisterApproval,
    OrganizerRegisterBusiness,
    OrganizerRegisterEmailConfirmation
} from "../../../../components/forms/organizer/signup/OrganizerSignupForms";

import "./organizerSignup.css"
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {InputValidator} from "../../../../util/validation/InputValidator";
import {registerOrganizer} from "../../../../services/auth/authSlice";

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

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    const [formData, setFormData] = useState({
        businessName: '',
        businessLicense: '',
        phone: '',
        address: '',
        suite: '',
        postal: '',
        city: '',
        province: ''
    })
    const {businessName, businessLicense, phone, address, suite, postal, city, province} = formData;

    const [formError, setFormError] = useState({
        businessNameError: '',
        businessLicenseError: '',
        phoneError: '',
        addressError: '',
        postalError: '',
        cityError: ''
    })

    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        //Not registered
        if (!user) navigate('/signup');
        //Email verified
        else if (user.userType === "Customer" && user.isVerified)
            setFormStep(() => 2);
        //Unverified organizer
        else if (user.userType === "Organizer" && user.organizer.info.verificationStatus === "VERIFICATION_IN_PROGRESS")
            setFormStep(() => 3);
    }, [])

    const onSubmit = (e) => {
        e.preventDefault();

        let businessNameValid = new InputValidator(businessName).minLength(5).maxLength(15).isValid;
        let businessLicenseValid = new InputValidator(businessLicense).minLength(9).maxLength(9).isValid;
        let phoneValid = new InputValidator(phone).matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).isValid;
        let addressValid = new InputValidator(address).minLength(8).maxLength(50).isValid;
        let postalValid = new InputValidator(postal).minLength(6).maxLength(6).isValid;
        let cityValid = new InputValidator(city).minLength(2).maxLength(15).isValid;
        let provinceValid = new InputValidator(province).minLength(2).maxLength(15).isValid;

        setFormError((prevState) => ({
            ...prevState,
            "businessNameError": businessNameValid ? false : "Enter a valid business name",
            "businessLicenseError": businessLicenseValid ? false : "Enter a valid business license",
            "phoneError": phoneValid ? false : "Enter a valid phone number",
            "addressError": addressValid ? false : "Enter a valid address",
            "postalError": postalValid ? false : "Please enter a valid postal code",
            "cityError": cityValid ? false : "Please enter a valid city",
            "provinceError": provinceValid ? false : "Please enter a valid province"
        }))
        let formValid = businessNameValid && businessLicenseValid && phoneValid && addressValid && postalValid && cityValid && provinceValid;

        if (formValid) {
            const userData = {
                "id": user._id,
                "businessName": businessName,
                "businessLicense": businessLicense,
                "address": address,
                "phoneNumber": phone,
                "city": city,
                "province": province,
                "postal": postal,
            }
            dispatch(registerOrganizer(userData));
        }
    }

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    function getCurrentPage() {
        switch (formStep) {
            case 1:
                return (<OrganizerRegisterEmailConfirmation/>)
                break;
            case 2:
                return (<OrganizerRegisterBusiness loading={isLoading} onChange={onChange} onSubmit={onSubmit} error={formError}/>)
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
                <div className="container-fluid row mt-5 mb-5 gx-0 gap-5 justify-content-center align-items-start">
{/*
                    {formStep == 3 && <button type="" id="back-button" className="mt-3 shadow-lg rounded-pill btn btn-block w-25 btn-secondary">BACK</button>}
*/}
                    {formStep == 2 && <button type="submit" form="businessForm" id="submit-button" className="mt-3 mb-5 shadow-lg rounded-pill btn btn-block w-25 btn-danger">CONTINUE</button>}
                </div>
            </div>
        </>
    )
}

export default OrganizerSignup;