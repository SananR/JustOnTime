import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import { loginUser } from '../../features/auth/authSlice'

import LoginForm from '../../components/forms/login/LoginForm'

function Login() {

    const [formError, setFormError] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const {email, password} = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {user, isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)

    useEffect(() => {
        //login failed
        if (isError) {
            console.log("meme")
            setFormError(() => ("Invalid credentials. Please try again."))
        }
        if (isSuccess /* TODO: uncomment */ /*|| user */) {
            navigate('/dashboard')
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

        const userData = {
            email,
            password
        }
        dispatch(loginUser(userData))
    }

    return (
        <div className="Login">
            <LoginForm onSubmit={onSubmit} onChange={onChange} error={formError}/>
        </div>
    );
}

export default Login;
  