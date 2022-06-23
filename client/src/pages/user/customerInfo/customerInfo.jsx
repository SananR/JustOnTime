import React, { useState } from 'react'
import EdiText from "react-editext";
import {useSelector, useDispatch} from 'react-redux';

function CustomerInfo() {

    //get user from local storage because assume the user is logged in and authenticated at this point  
    //change this line if its not local starage or the data changes


    //const user = JSON.parse(localStorage.getItem('user'));
    const user = useSelector((state) => state.auth.user)
    function logUser (){
        console.log(user._id)
    }
    /* idea:
    in authslice create a thunk thing to post the changes 
    create an extra reducer that sets the state of the user is updated successfully else idk 
    then create a button that dispatches to the new thunk you created everytime you save the changes 
    if the thunk succeeds then toggle to non- editing mode else show an error 
    if you cancel or try to edit the text box just toggle the editing and non-editing mode */

    // set up for the editing validation 

    //get user info common to all users 
    const basicInfo = (
        <div>
        <h1>Personal Info </h1>
        <h5 for= 'firstName'> First Name:</h5>
        <div>{user.userInfo.firstName}</div> 
        <h5 for= 'lastName'> Last Name:</h5>
        <div>{user.userInfo.lastName}</div> 
        <h5 for= 'email'> E-mail:</h5>
        <div>{user.userInfo.email}</div> 
        <button onClick={logUser}> Click to get user</button>
        </div>

    )

    const displaytype = () => {
        //check of the user is a regular user or organizer and dsiplay the information accordingly
        if(user.userType === "Customer"){
            return basicInfo
        } else {
            return (
                <div>
                {basicInfo}
                <h5 for= 'phone#'> Phone Number:</h5>
                <div>{user.organizer.phoneNumber}</div>
        
                <h5 for= 'status'> Status:</h5>
                <div>{user.organizer.status}</div>

                </div>
            )
        }
    }


    return (
        displaytype()
    )
}

export default CustomerInfo;