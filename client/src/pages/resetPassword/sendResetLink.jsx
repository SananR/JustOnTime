import React, { useEffect, useState } from "react";
import {FaUserAlt} from 'react-icons/fa'
import InputField from "../../components/forms/input/InputField";
import logo from "../../../public/logo_cropped.png";
import axios from 'axios'

function SendResetLink() {
    const API_URL = '/api/';
    const [formError, setFormError] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [success, setSuccess] = useState(false);
    const {changed} = useParams(); 

    useEffect(() => {
        if(!(changed === "email" || changed === "password")){
            setSuccess("This Page does not exist");
        }
    }, []); 

    const onSubmit = async (e) => {
        e.preventDefault();
        if(userEmail === "" || userEmail.length < 5 ){
            setFormError("Please enter a valid email." );
        } else {
            try {
                setFormError("");
                const response = await axios.post(API_URL + 'user/send-reset-link',  {"email": userEmail, "field": changed});
                console.log(response.data);
                setSuccess(response.data);
            } catch (error) {
                setFormError(error.response.data.message);
            }  
        }
    }

    const emailForm = (
        <div id="login-container" className="d-flex flex-column justify-content-start mt-5 mb-5 position-relative shadow-lg container h-100 p-5">
            <div className="text-center mt-3">
                <img
                    src={logo}
                    width='60%'
                    id="logo-img"
                    className='img-fluid'
                    alt='JustOnTime'
                />
            </div>
            <h1 id="welcome-text" className="text-center mt-3 mb-5"><strong> Send {changed.charAt(0).toUpperCase() + changed.slice(1)} Reset link  </strong></h1>
            <form onSubmit={onSubmit} className="w-100 d-flex justify-content-center ">
                <div className="form-group col-7">
                    <InputField
                        name="email"
                        error={formError}
                        icon={<FaUserAlt className="icon position-absolute" color="red" size={20}/>}
                        type="email"
                        placeholder="Email Address"
                        errorMargin="90%"
                        onChange= {e =>  setUserEmail(e.target.value)}
                    />
                    <button type="submit" id="submit-button" className="mt-3 shadow-lg rounded-pill btn btn-block w-100 btn-danger">Send Email</button>
                </div>
            </form>
        </div>
    )

    const emailSent = (

        <div id="login-container" className="d-flex flex-column justify-content-start mt-5 mb-5 position-relative shadow-lg container h-100 p-5">
        <div className="text-center mt-3">
            <img
                src={logo}
                width='60%'
                id="logo-img"
                className='img-fluid'
                alt='JustOnTime'
            />
        </div>
        <h1 id="welcome-text" className="text-center mt-5"><strong> {success}  </strong></h1>
       
         </div>
    )

        return (
           success ? emailSent : emailForm
        );
}

export default SendResetLink;
  