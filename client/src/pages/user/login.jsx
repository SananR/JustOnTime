import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../features/auth/authSlice'

import LoginForm from '../../components/forms/login/LoginForm'

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

    return (
        <div className="Login">
            <LoginForm />
        </div>
    );
}

export default Login;
  