import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {registerUser, reset} from '../../features/auth/authSlice'

import SignUpForm from "../../components/forms/signup/SignUpForm";

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
            navigate('/verification-required')
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

        var firstName = document.getElementById("first_name").value; 
        var lastName = document.getElementById("last_name").value;
        var email = document.getElementById("email").value;  
        var password = document.getElementById("password").value;
        var password2 = document.getElementById("password2").value; 

        const values = [firstName, lastName, email, password, password2]; 
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

    return (
        <div className="Signup">
            <SignUpForm />
        </div>
    );
}

export default Signup;
  