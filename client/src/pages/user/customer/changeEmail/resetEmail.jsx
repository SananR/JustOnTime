import React, {useEffect, useState} from "react";
import {FaUserAlt, FaLock} from 'react-icons/fa'
import { useParams, useNavigate } from "react-router-dom";
import InputField from "../../../../components/forms/input/InputField";
import {useDispatch} from 'react-redux';
import logo from "../../../../logo_cropped.png";
import {logoutUser, reset } from "../../../../services/auth/authSlice"
import axios from 'axios'

function ResetEmail() {
    const API_URL = '/api/';
    const [formError, setFormError] = useState(false);
    const [email, setEmail] = useState(false);
    const [email2, setEmail2] = useState(false);
    const [exists, setExists] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {token, id} = useParams(); 

    const logout = () => {
        dispatch(logoutUser());
        dispatch(reset());
    }

    const checkToken = async () => {
        const valid = await axios.post(API_URL + 'user/checkToken',  {"token": token});
        return valid;
    }
    useEffect(() => {
        checkToken().then(() => setExists(true)).catch((e) => setExists(false));
    }, []); 

    const onSubmit = async (e) => {
        e.preventDefault();
        if (email === "" || email2 === "" ){
            setFormError("All fields are required")
        } else if (email.length < 5 || email.length > 50 || 
            email2.length < 5 || email2.length > 50 ){
            setFormError("Emails must be between 5-50 characters");
        } else if ( !(email == email2)){
            setFormError("Emails must match");
        } else {
            try {
                setFormError("");
                const response = await axios.post(API_URL + 'user/personal-info', {"id": id, "update": { "userInfo.email" : email }});
                console.log(response)
                logout()
            } catch (error) {
                setFormError(error.response.data.message);
            } 
            try {
                const response = await axios.post(API_URL + 'user/send-email', {"id": id, "message": "Email successfully changed!", subject: "JUST ON TIME: Email changed" });
                navigate('/reset-successful/email')
            } catch (error) {
                setFormError(error.response.data.message);
            } 
            
        }

    }

    const tokenExists = (
        <div id="login-container" className="d-flex flex-column justify-content-start mt-5 mb-5 position-relative shadow-lg container h-100 p-5">
                <div className="text-center mt-3">
                    <img
                        src={logo}
                        width='60%'
                        id="logo-img"
                        className='img-fluid'
                        alt='JustOnTime'
                    />
                </div>
                <h1 id="welcome-text" className="text-center mb-4"><strong> Email Reset </strong></h1>
                <form onSubmit={onSubmit} className="w-100 d-flex justify-content-center ">
                <div className="form-group col-7">
                    <InputField
                        name="email"
                        className="mb-3"
                        error={formError}
                        icon={<FaLock className="icon position-absolute" color="red" size={20}/>}
                        type="email"
                        placeholder="New Email"
                        errorMargin="90%"
                        onChange ={e => setEmail(e.target.value)}
                    />
                    <InputField
                        name="email2"
                        error={formError}
                        icon={<FaLock className="icon position-absolute" color="red" size={20}/>}
                        type="email"
                        placeholder="Confirm Email"
                        errorMargin="90%"
                        onChange ={e => setEmail2(e.target.value)}
                    />
                    <button type="submit" id="submit-button" className="mt-3 shadow-lg rounded-pill btn btn-block w-100 btn-danger">Submit</button>
                </div>
            </form>
            <p className="text-muted text-center">Note: If you are logged in clicking submit will log you out and you will need to log back in with the new credentials to access your account again.</p>
        </div>
    );

    const noToken = (
        <p className="d-flex flex-column text-center justify-content-start mt-5 mb-5 position-relative shadow-lg container h-100 p-5"><strong> This page does not exist.</strong></p>
    )
    
    return (
        (exists) ? tokenExists : noToken
    );
}

export default ResetEmail;
  