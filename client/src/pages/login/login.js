import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loginUser } from '/Users/sanan/finalprojects22-justontime/client/src/features/auth/authSlice'

import "./login.css";


function Login() {

    const [errorMessageUser, setErrorMessageUser] = useState("");
    const [errorMessagePass, setErrorMessagePass] = useState("");

     const errors = {
        username: "Username Required",
        usernotfound: "Username not found",
        password: "Password Required",
        passnotfound: "Invalid Password"
    };

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

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

        var email = document.getElementById("email").value; 
        var password = document.getElementById("password").value;
        
        if(email === "" || password === ""){
            if (email === ""  && password === ""){
                setErrorMessageUser(errors.username)
                setErrorMessagePass(errors.password)
            } else if (email === ""){
                setErrorMessagePass("")
                setErrorMessageUser(errors.username)
            } else if (email === "") {
                setErrorMessageUser("")
                setErrorMessagePass(errors.password)
            }
        } else {
            const userData = {
                email,
                password
            }
            dispatch(loginUser(userData))
        }

    }


    const renderForm = (
        <div className= "Login-cont">
            <div className="title">Login</div>
            <form onSubmit={onSubmit}>
                <div className="User-input">
                <label id= "user-label">Username:</label> 
                <input 
                    id= "email" 
                    type= "text" 
                    placeholder= "Enter Username"
                />
                {errorMessageUser && <div className="error"> {errorMessageUser} </div>}
                </div>

                <div className="Pass-input">
                <label id= "pass-label">Password:</label> 
                <input 
                    id= "password" 
                    type= "password" 
                    placeholder= "Enter Password"
                />
                {errorMessagePass && <div className="error"> {errorMessagePass} </div>}
                </div>
                <button id= "login-button">Login</button>
            </form>
            
            <a id= "user-button" href= "/signup">New User?</a>

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
              {/*   <div id="grey"></div> */}
                <div id="pink"></div>
               {/*  <div id="red"></div> */}
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
        <div className="Login">
            {renderForm}
            {renderback}
        </div>
    );
}
   export default Login;
  