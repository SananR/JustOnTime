import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import {registerUser} from '../../features/auth/authSlice'
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
        else if (isSuccess /* TODO: uncomment */ /*|| user */) {
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

        let firstNameValid = new InputValidator(firstName).minLength(2).maxLength(50).isValid;
        let lastNameValid = new InputValidator(lastName).minLength(2).maxLength(50).isValid;
        let emailValid = new InputValidator(email).minLength(5).maxLength(50).isValid;
        let passwordValid = new InputValidator(password).minLength(6).maxLength(50).matches(/\d/).isValid;
        let password2Valid = new InputValidator(password2).equals(password).isValid;

        setFormError((prevState) => ({
            ...prevState,
            "firstNameError": firstNameValid ? false : "Enter a valid first name",
            "lastNameError": lastNameValid ? false : "Enter a valid last name",
            "emailError": emailValid ? false : "Enter a valid email address",
            "passwordError": passwordValid ? false : "Enter a valid password",
            "password2Error": password2Valid ? false : "Passwords must match"
        }))
        let formValid = firstNameValid && lastNameValid && emailValid && passwordValid && password2Valid;

        if (formValid) {
            const userData = {
                "firstName": firstName,
                "lastName": lastName,
                "email": email,
                "password": password,
            }
            dispatch(registerUser(userData));
        }
    }

    return (
        <div className="Signup">
            <SignUpForm loading={isLoading} onSubmit={onSubmit} onChange={onChange} error={formError}/>
        </div>
    );
}

export default Signup;
  