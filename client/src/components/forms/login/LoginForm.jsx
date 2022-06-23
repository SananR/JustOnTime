import React from 'react'

import './loginform.css'
import logo from "../../header/logo.png";

import {FaUserAlt, FaLock} from 'react-icons/fa'
import InputField from "../input/InputField";
import GoogleButton from 'react-google-button'

function LoginForm(props) {
    return (
        <div id="login-container" class="mt-5 mb-5 shadow-lg container">
            <h1 id="welcome-text" class="pt-5 text-center"><strong>WELCOME TO</strong></h1>
            <div class="text-center">
                <img
                    src={logo}
                    width='60%'
                    id="logo-img"
                    class='img-fluid'
                    alt='JustOnTime'
                />
            </div>
            <p id="sub-text" className="pt-4 text-break text-muted text-center">Log in to start finding experiences and shape your life.<br/>Just the way you want, just on time.</p>
            <form onSubmit={props.onSubmit} class="row justify-content-center">
                <div class="form-group col-7">
                    <InputField
                        className="mt-4"
                        name="email"
                        onChange={props.onChange}
                        icon={<FaUserAlt class="icon position-absolute" color="red" size={20}/>}
                        type="email"
                        placeholder="Email Address"
                        errorMargin="90%"
                    />
                    <InputField
                        error={props.error}
                        className="mt-3"
                        name="password"
                        onChange={props.onChange}
                        icon={<FaLock class="icon position-absolute" color="red" size={20}/>}
                        type="password"
                        placeholder="Password"
                        errorMargin="90%"
                    />
                    <button type="submit" id="submit-button" className="mt-3 shadow-lg rounded-pill btn btn-block w-100 btn-danger">SIGN IN</button>
                    <p class="text-center w-100 mt-3">Don't have an account yet ? <a id="signup-link" class="text-danger" href="/register">Sign Up Now</a></p>
                    <hr data-content="and" className="mt-4 hr-text"/>
                    <GoogleButton
                        class="mt-4 w-100"
                        onClick={() => { console.log('Google button clicked') }}
                    />
                </div>
            </form>
        </div>
    );
}

export default LoginForm