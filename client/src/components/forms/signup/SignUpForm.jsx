import React from 'react'

import './signupform.css'
import {HiCursorClick} from 'react-icons/hi'
import InputField from '../input/InputField'
import {FaLock, FaUserAlt} from "react-icons/fa";
import {MdEmail} from "react-icons/md"
import GoogleButton from "react-google-button";

function SignUpForm() {
    return (
        <div id="signup-container" className="d-flex gx-0 mt-5 mb-5 shadow-lg container">
            <div id="left-container" class="col">
                <h1 id="signup-text" class="text-center mt-5"><strong>SIGN UP</strong></h1>
                <p className="pt-3 text-break text-muted text-center">Sign up and start bidding on experiences immediately.<br/>You're never late, always just on time.</p>
                <form className="row justify-content-center">
                    <div className="mb-2 form-group col-9">
                        <div class="row gx-0 gap-1 justify-content-center">
                            <InputField
                                className="col mt-2"
                                icon={<FaUserAlt class="icon position-absolute" color="red" size={20}/>}
                                type="text"
                                placeholder="First Name"
                            />
                            <InputField
                                className="col mt-2"
                                icon={<FaUserAlt class="icon position-absolute" color="red" size={20}/>}
                                type="text"
                                placeholder="Last Name"
                            />
                        </div>
                        <InputField
                            className="col mt-3"
                            icon={<MdEmail class="icon position-absolute" color="red" size={20}/>}
                            type="email"
                            placeholder="Email Address"
                        />
                        <InputField
                            className="mt-3"
                            icon={<FaLock class="icon position-absolute" color="red" size={20}/>}
                            type="password"
                            placeholder="Password"
                        />
                        <InputField
                            className="mt-3"
                            icon={<FaLock class="icon position-absolute" color="red" size={20}/>}
                            type="password"
                            placeholder="Confirm Password"
                        />
                        <button type="submit" id="submit-button" className="mt-3 shadow-lg rounded-pill btn btn-block w-100 btn-danger">SIGN UP</button>
                        <p className="text-center w-100 mt-3">Already have an account ? <a id="login-link" className="text-danger" href="/login">Log In Now</a></p>
                        <hr data-content="and" className="mt-4 hr-text"/>

                        <GoogleButton
                            class="w-100 mt-4"
                            onClick={() => { console.log('Google button clicked') }}
                        />
                    </div>
                </form>
            </div>
            <div id="right-container" class="bg-image col container justify-content-center align-content-center">
                <h1 id="boundless-text" className="text-center row"><strong>BOUNDLESS EXPERIENCE</strong></h1>
                <h2 id="clicks-text" className="text-center row"><strong>Just a few clicks away...<HiCursorClick id="cursor-icon" class="mb-4 ms-2" color="white" size={50}/></strong></h2>
            </div>
        </div>
    );
}

export default SignUpForm