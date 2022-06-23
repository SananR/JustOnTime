import React from 'react'

import './signupform.css'
import {HiCursorClick} from 'react-icons/hi'
import InputField from '../input/InputField'
import {FaLock, FaUserAlt} from "react-icons/fa";
import {MdEmail} from "react-icons/md"
import GoogleButton from "react-google-button";

function SignUpForm(props) {
    return (
        <div id="signup-container" className="d-flex gx-0 mt-5 mb-5 shadow-lg container-sm">
            <div id="left-container" className="col pb-5">
                <h1 id="signup-text" className="text-center mt-5"><strong>SIGN UP</strong></h1>
                <p className="pt-3 text-break text-muted text-center">Sign up and start bidding on experiences immediately.<br/>You're never late, always just on time.</p>
                <form onSubmit={props.onSubmit} className="row justify-content-center">
                    <div className="mb-2 form-group col-9">
                        <div className="row gx-0 gap-1 justify-content-center">
                            <InputField
                                error={props.error.firstNameError}
                                name="firstName"
                                onChange={props.onChange}
                                className="col mt-3"
                                icon={<FaUserAlt className="icon position-absolute" color="grey" size={20}/>}
                                type="text"
                                placeholder="First Name"
                                errorMargin="86%"
                            />
                            <InputField
                                error={props.error.lastNameError}
                                name="lastName"
                                onChange={props.onChange}
                                className="col mt-3"
                                icon={<FaUserAlt className="icon position-absolute" color="grey" size={20}/>}
                                type="text"
                                placeholder="Last Name"
                                errorMargin="86%"
                            />
                        </div>
                        <InputField
                            error={props.error.emailError}
                            name="email"
                            onChange={props.onChange}
                            className="col mt-2"
                            icon={<MdEmail className="icon position-absolute" color="grey" size={20}/>}
                            type="email"
                            placeholder="Email Address"
                        />
                        <InputField
                            error={props.error.passwordError}
                            name="password"
                            onChange={props.onChange}
                            className="mt-2"
                            icon={<FaLock className="icon position-absolute" color="grey" size={20}/>}
                            type="password"
                            placeholder="Password"
                        />
                        <InputField
                            error={props.error.password2Error}
                            name="password2"
                            onChange={props.onChange}
                            className="mt-2"
                            icon={<FaLock className="icon position-absolute" color="grey" size={20}/>}
                            type="password"
                            placeholder="Confirm Password"
                        />
                        <button type="submit" id="submit-button" className="mt-3 shadow-lg rounded-pill btn btn-block w-100 btn-danger">SIGN UP</button>
                        <p className="text-center w-100 mt-3">Already have an account ? <a id="login-link" className="text-danger" href="/login">Log In Now</a></p>
                        <hr data-content="and" className="mt-4 hr-text"/>

                        <GoogleButton
                            className="w-100 mt-4"
                            onClick={() => { console.log('Google button clicked') }}
                        />
                    </div>
                </form>
            </div>
            <div id="right-container" className="bg-image col container justify-content-center align-content-center">
                <h1 id="boundless-text" className="text-center row"><strong>BOUNDLESS EXPERIENCE</strong></h1>
                <h2 id="clicks-text" className="text-center row"><strong>Just a few clicks away...<HiCursorClick id="cursor-icon" className="mb-4 ms-2" color="white" size={50}/></strong></h2>
            </div>
        </div>
    );
}

export default SignUpForm