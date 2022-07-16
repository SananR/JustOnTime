import React, {useEffect, useState} from "react";
import {FaUserAlt, FaLock} from 'react-icons/fa'
import { useParams, useNavigate } from "react-router-dom";
import {useDispatch} from 'react-redux';
import InputField from "../../components/forms/input/InputField";
import Spinner from "../../components/spinner/Spinner";
import logo from "../../logo_cropped.png";
import {logoutUser, reset } from "../../services/auth/authSlice"
import axios from 'axios'

function ResetPassword() {
    const API_URL = '/api/';
    const [formError, setFormError] = useState(false);
    const [password, setPassword] = useState(false);
    const [password2, setPassword2] = useState(false);
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
        if (password === "" || password2 === "" ){
            setFormError("All fields are required")
        } else if (password.length < 3 || password.length > 50 || 
            password2.length < 3 || password2.length > 50 ){
            setFormError("Passwords must be between 3-50 characters");
        } else if ( !(password == password2)){
            setFormError("Passwords must match");
        } else {
            try {
                setFormError("");
                const response = await axios.post(API_URL + 'user/hash', {"id": id, "password": password});
                logout()
            } catch (error) {
                setFormError(error.response.data.message);
            } 
            try {
                const response = await axios.post(API_URL + 'user/send-email', {"id": id, "message": "Password successfully changed!", subject: "JUST ON TIME: Password changed" });
                navigate('/reset-successful/password')
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
                <h1 id="welcome-text" className="text-center mb-4"><strong> Password Reset </strong></h1>
                <form onSubmit={onSubmit} className="w-100 d-flex justify-content-center ">
                <div className="form-group col-7">
                    <InputField
                        name="password"
                        className="mb-3"
                        error={formError}
                        icon={<FaLock className="icon position-absolute" color="red" size={20}/>}
                        type="password"
                        placeholder="New Password"
                        errorMargin="90%"
                        onChange ={e => setPassword(e.target.value)}
                    />
                    <InputField
                        name="password2"
                        error={formError}
                        icon={<FaLock className="icon position-absolute" color="red" size={20}/>}
                        type="password"
                        placeholder="Confirm Password"
                        errorMargin="90%"
                        onChange ={e => setPassword2(e.target.value)}
                    />
                    <button type="submit" id="submit-button" className="mt-3 shadow-lg rounded-pill btn btn-block w-100 btn-danger">Submit</button>
                </div>
            </form>
            <p id="sub-text" className="text-break text-muted text-center">Note: If you are logged in clicking submit will log you out and you will need to log back in with the new credentials to access your account again.</p>
        </div>
    );

    const noToken = (
        <p className="d-flex flex-column text-center justify-content-start mt-5 mb-5 position-relative shadow-lg container h-100 p-5"><strong> This page does not exist.</strong></p>
    )
    
    return (
        (exists) ? tokenExists : noToken
    );
}

export default ResetPassword;
  