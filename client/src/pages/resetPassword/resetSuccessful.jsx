import React, {useEffect, useState} from "react";
import {BsShieldCheck } from "react-icons/bs"


function ResetSuccessful() {
    return (
        <div className="d-flex flex-column text-center mt-3 justify-content-start 
         position-relative shadow-lg container h-100 p-5">
           <div className="text-center my-3"> <BsShieldCheck color="green" size={150}/></div>
            <p className="display-4"><strong> Password Changed!</strong> </p>
            <p> Your password was successfully changed.  </p>
            <a className="text-danger" href="/login"> Login</a> 
        </div>
    )
}

export default ResetSuccessful