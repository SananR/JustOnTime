import React, {useEffect, useState} from 'react'
import "./verifyEmail.css";
import { useParams } from 'react-router-dom';
import { verifyEmail } from '../../../../services/emailVerification/customer/verifyEmail';

function CustomerVerifyEmail() {
    const [message, setMessage] = useState({message: ""});

    const { email, token } = useParams();

    useEffect(() => {
        verifyEmail(email, token).then(response => {
            console.log(response)
            setMessage({message: response.data})
        }).catch(err => {
            console.log(err)
            console.log(err.response)
            if (err.response.status / 100 === 4){
                setMessage({message: err.response.data.msg})
            }
            else{
                setMessage({message: "Something went wrong, please try again!"})
            }        
        })
    }, [email, token])

    return (
        <div id="container">
            <div class="message">
                {message.message}
            </div>
        </div>
    )
}

export default CustomerVerifyEmail;