import React from 'react'

import './loginform.css'
import logo from "../header/logo.png";

import {FaUserAlt, FaLock} from 'react-icons/fa'

function LoginForm() {
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
            <form class="row justify-content-center">
                <div class="form-group col-7">
                    <div class="position-relative mt-5">
                        <FaUserAlt class="icon position-absolute" color="red" size={20}/>
                        <input type="email" className="px-5 rounded-pill form-control form-control-lg" id="email-input" placeholder="Email Address" />
                    </div>
                    <div className="position-relative mt-3">
                        <FaLock class="icon position-absolute" color="red" size={20}/>
                        <input type="password" className="px-5 rounded-pill form-control form-control-lg" id="password-input" placeholder="Password"/>
                    </div>
                    <button type="submit" id="submit-button" className="mt-3 shadow-lg rounded-pill btn btn-block w-100 btn-danger">SIGN IN</button>
                    <p class="text-center w-100 mt-3">Don't have an account yet ? <a id="signup-link" class="text-danger" href="/register">Sign Up Now</a></p>
                    <hr data-content="and" className="hr-text"/>
                </div>
            </form>
        </div>
    );
}

export default LoginForm