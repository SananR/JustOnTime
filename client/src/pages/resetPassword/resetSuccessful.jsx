import React, {useEffect, useState} from "react";
import {BsShieldCheck } from "react-icons/bs"
import {useParams} from 'react-router-dom'


function ResetSuccessful() {
    const {changed} = useParams(); 
    function errorCheck() {
        if(changed == "email" || changed === "password"){
          return (
            <div className="d-flex flex-column text-center mt-3 justify-content-start 
            position-relative shadow-lg container h-100 p-5">
              <div className="text-center my-3"> <BsShieldCheck color="green" size={150}/></div>
               <p className="display-4"><strong> {changed.charAt(0).toUpperCase() + changed.slice(1)} Changed!</strong> </p>
               <p> Your {changed.charAt(0).toUpperCase() + changed.slice(1)} was successfully changed.  </p>
               <a className="text-danger" href="/login"> Login</a> 
           </div>
          )  
        } else {
           return ( <div></div>)
        }
    }
    return (
        errorCheck()
    )
}

export default ResetSuccessful