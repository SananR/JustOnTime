import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {registerUser, reset} from '../../features/auth/authSlice'
import {InputValidator} from "../../util/validation/InputValidator";

import SignUpForm from "../../components/forms/signup/SignUpForm";

function Signup() {

    const [formError, setFormError] = useState({
        firstNameError: false,
        lastNameError: false,
        emailError: false,
        passwordError: false,
        password2Error: false
    })

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
            console.log(message);
        }
        if (isSuccess /* TODO: uncomment */ /*|| user */) {
            navigate('/dashboard')
        }
    }, [user, isError, isSuccess, message, isLoading]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = (e) => {
        e.preventDefault();
        let firstNameValid = new InputValidator(firstName).minLength(5).maxLength(10).isValid;
        let lastNameValid = new InputValidator(firstName).minLength(5).maxLength(10).isValid;
        if (!firstNameValid) {
            setFormError((prevState) => ({
                ...prevState,
                ["firstNameError"]: !firstNameValid,
                ["lastNameError"]: !lastNameValid
            }))
        }
        else {
            const userData = {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
            }
            dispatch(registerUser(userData))
        }
    }

    return (
        <div className="Signup">
            <SignUpForm onSubmit={onSubmit} onChange={onChange} error={formError}/>
        </div>
    );
}

export default Signup;
  