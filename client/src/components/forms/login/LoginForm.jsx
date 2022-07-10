import React from 'react'

import './loginform.css'
import logo from "../../../logo_cropped.png";

import {FaUserAlt, FaLock} from 'react-icons/fa'
import InputField from "../input/InputField";
import GoogleButton from 'react-google-button'
import Spinner from "../../spinner/Spinner";

function LoginForm(props) {
    return (
        <div id="login-container" className="d-flex flex-column justify-content-center align-items-center mt-5 mb-5 position-relative shadow-lg container">
            <Spinner color={"#ff6178"} loading={props.loading} size={75} />
            <h1 id="welcome-text" className="text-center"><strong>WELCOME TO</strong></h1>
            <div className="text-center">
                <img
                    src={logo}
                    width='60%'
                    id="logo-img"
                    className='img-fluid'
                    alt='JustOnTime'
                />
            </div>
            <p id="sub-text" className="text-break text-muted text-center">Log in to start finding experiences and shape your life.<br/>Just the way you want, just on time.</p>
            <form onSubmit={props.onSubmit} className="w-100 d-flex justify-content-center align-items-center">
                <div className="form-group col-7">
                    <InputField
                        name="email"
                        onChange={props.onChange}
                        icon={<FaUserAlt className="icon position-absolute" color="red" size={20}/>}
                        type="email"
                        placeholder="Email Address"
                        errorMargin="90%"
                    />
                    <InputField
                        error={props.error}
                        className="mt-3"
                        name="password"
                        onChange={props.onChange}
                        icon={<FaLock className="icon position-absolute" color="red" size={20}/>}
                        type="password"
                        placeholder="Password"
                        errorMargin="90%"
                    />
                    <button type="submit" id="submit-button" className="mt-3 shadow-lg rounded-pill btn btn-block w-100 btn-danger">SIGN IN</button>
                    <p className="text-center w-100 mt-3">Don't have an account yet ? <a id="signup-link" className="text-danger" href="/signup">Sign Up Now</a></p>
                    <p className="text-center w-100 mt-3"> <a id="signup-link" className="text-danger" href="/forgottenpassword">Forgot your password?</a></p>
                    <hr data-content="and" className="mt-4 hr-text"/>
                    <GoogleButton
                        className="mt-4 w-100"
                        onClick={() => { console.log('Google button clicked') }}
                    />
                </div>
            </form>
        </div>
    );
}

export default LoginForm