import React from 'react'
import "./verifyEmail.css";
import { useParams } from 'react-router-dom';
import { verifyEmail } from '../../features/emailVerification/verifyEmail';

function VerifyEmail() {
    const { email, token } = useParams();
    verifyEmail(email, token);
    return (
        <div>{"Hello there"}</div>
    )
}

export default VerifyEmail;