import React, { useState } from 'react'
import "./verifyEmail.css";
import { useParams, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../../../features/emailVerification/organizer/verifyEmail';
import { Component } from 'react';

function OrgVerifyEmail() {
    const [message, setMessage] = useState({message: ""});

    const { email, token } = useParams();
    const navigate = useNavigate();

    React.useEffect(() => {
        verifyEmail(email, token).then(response => {
            console.log(response)
            setMessage({message: response.data})
        }).catch(err => {
            console.log(err)
            console.log(err.response)
            if (err.response.status / 100 == 4){
                setMessage({message: err.response.data.msg})
            }
            else{
                setMessage({message: "Something went wrong, please try again!"})
            }   
        })
    }, [])
    return (
        <div id="container">
            <div class="message">
                {message.message}
            </div>
        </div>
    )
}

export default OrgVerifyEmail;