import React, {useState} from 'react'
import { resendCode } from '../../../../features/emailVerification/customer/resendCode.js';

import "./verificationRequired.css";

function CustomerVerificationRequired() {
    const [message, setMessage] = useState({message: "", visible: false});

    const handleResendCode = () => {
        resendCode().then((data) => {
            console.log(data);
            setMessage({message: data, visible: true});
        }).catch(err => {
            console.log(err)
            console.log(err.response)
            if (err.response.status / 100 === 4){
                setMessage({message: err.response.data.msg})
            }
            else{
                setMessage({message: "Something went wrong, please try again!"})
            }   
        })    }
    return (
        <div id="container"> 
            {!message.visible && 
                <div>
                    <div class="message">
                        Verification code has been sent to your email.
                        (It may be located in the spam folder) 
                        <br></br>
                        If you would like to resend the new verification link, 
                        please click <b>resend link</b> below.
                    </div>
                    <button id="resendbtn" onClick={handleResendCode}>resend link</button>
                </div>
            }
            {message.visible && 
                <div class="message">{message.message}</div>
            }
        </div>
    )
}

export default CustomerVerificationRequired;