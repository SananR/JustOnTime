import React from 'react'
import "./verificationRequired.css";
import { resendCode } from '../../features/emailVerification/resendCode.js';

function VerificationRequired() {
    return (
        <div id="container">  
            <div id="message">
                Verification code has been sent to your email.
                (It may be located in the spam folder) 
                If you would like to resend the new verification link, 
                please click <b>resend the link</b> below.
            </div>
            <button id="resendbtn" onClick={resendCode}>resend the link</button>
        </div>
    )
}

export default VerificationRequired;