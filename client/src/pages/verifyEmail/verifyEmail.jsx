import React, { useState } from 'react'
import "./verifyEmail.css";
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../features/emailVerification/verifyEmail';

function VerifyEmail() {
    const [message, setMessage] = useState({message: ""});

    const { email, token } = useParams();
    const navigate = useNavigate();
    verifyEmail(email, token).then(response => {
        console.log(response)
        setMessage({message: response.data})
    }).catch(err => {
        console.log(err)
        setMessage({message: "Something went wrong, please try again!"})
    })
    return (
        <div>{message.message}</div>
    )
}

export default VerifyEmail;