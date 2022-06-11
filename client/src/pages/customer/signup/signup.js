import React, {useEffect, useState} from "react";
import { render } from "react-dom";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import "./signup.css";
import {registerUser, reset} from '/Users/sanan/finalprojects22-justontime/client/src/features/auth/authSlice.js'

function Signup() {

    const [errorName, setErrorName] = useState("");
    const [errorLastname, setErrorLastname] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirm, setErrorConfirm] = useState("");

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: ''
    })

    const {firstName, lastName, email, password, password2} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth) 

    useEffect(() => {
        if (isError) {
            //handle error
        }
        if (isSuccess /*|| user*/) {
            navigate('/')
        }


    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();

        var Name = document.getElementById("first_name").value; 
        var Lastname = document.getElementById("last_name").value;
        var Email = document.getElementById("email").value;  
        var Password = document.getElementById("password").value;
        var Confirm = document.getElementById("password2").value; 
        var Phone = document.getElementById("phone"); 

        const values = [Name, Lastname, Email, Password, Confirm]; 
        const names = ["Name", "Lastname", "Email", "Password", "Confirm"]; 
        const funcs = [setErrorName, setErrorLastname, setErrorEmail, setErrorPassword, setErrorConfirm]
        var empty = 0
        for (var i in values){
            if(values[i] === ""){
                funcs[i](names[i] + " Required")
                empty++;
            } else {
                funcs[i]("")
            }
        }
        if(empty == 0 ){
            const userData = {
                firstName,
                lastName,
                email,
                password
            }

            dispatch(registerUser(userData))
        }

    }


    const renderForm = (
        <div className= "Signup-cont">
            <div className="title">Create a new account</div>
            <div className="sub">Get Started</div>

            <form onSubmit={onSubmit}>
                <div className="wrapper">
                    <div className="Name-input">
                    <label id= "name-label">First Name:</label> 
                    <input 
                        id= "first_name" 
                        type= "text" 
                        placeholder= "First Name"
                        onChange={onChange}
                    />
                    {errorName && <div className="error"> {errorName} </div>}
                    </div>

                    <div className="Lastname-input">
                    <label id= "Lastname-label">Last Name:</label> 
                    <input 
                        id= "last_name" 
                        type= "text" 
                        placeholder= "Last Name"
                        onChange={onChange}
                    />
                    {errorLastname && <div className="error"> {errorLastname} </div>}
                    </div> 
                </div>
                
                <div className="wrapper">
                    <div className="Email-input">
                    <label id= "email-label">Email:</label> 
                    <input 
                        id= "email" 
                        type= "text" 
                        placeholder= "Email Address"
                        onChange={onChange}
                    />
                    {errorEmail && <div className="error"> {errorEmail} </div>}
                    </div>

                    <div className="Phone-input">
                        <label id= "Phone-label">Phone Number: </label> 
                        <input 
                            id= "phone" 
                            type= "phone" 
                            placeholder= "Phone Number"
                            onChange={onChange}
                        />
                    </div>
                </div>
                <div className="Password-input">
                    <label id= "pass-label">Password:</label> 
                    <input 
                        id= "password" 
                        type= "password" 
                        placeholder= "Password"
                        onChange={onChange}
                    />
                    {errorPassword && <div className="error"> {errorPassword} </div>}
                </div>
                
                <div className="Conf-input">
                    <label id= "Conf-label">Confirm Password:</label> 
                    <input 
                        id= "password2" 
                        type= "password" 
                        placeholder= "Confirm Password"
                        onChange={onChange}
                    />                
                    {errorConfirm && <div className="error"> {errorConfirm} </div>}
                </div>
                <button id= "signup-button" type="submit" className="btn btn-block">Sign Up</button>
            </form>


            <a id= "signin-button" href="/login">Already have an account?</a>

        </div>
    )

    const renderback = (
        <div className="tris">
            <div id="tri1">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>
            <div id="tri2">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>
            <div id="tri3">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri4">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri5">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri6">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri7">
                <div id="pink"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri8">
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri9">
            <div id="grey"></div>
                <div id="red2"></div>
                <div id="pink2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri10">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>
            <div id="tri11">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri12">
                <div id="lightgrey"></div>
            </div>
            
        </div>
    )

    return (
        <div className="Signup">
            {renderForm}
            {renderback}
        </div>
    );
}
   export default Signup;
  