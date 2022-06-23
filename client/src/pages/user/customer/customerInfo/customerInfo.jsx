import React from 'react'
import { EditText } from 'react-edit-text';
import 'react-edit-text/dist/index.css';


function CustomerInfo() {
    //get user from local storage because assume the user is logged in and authenticated at this point  
    //change this line if its not local starage or the data changes
    const user = JSON.parse(localStorage.getItem('user'));

    //get user info common to all users 
    const basicInfo = (
        <div>
        <h1>Personal Info </h1>
        <h5 for= 'firstName'> First Name:</h5>
        <EditText
          className='firstName'
          defaultValue={user.userInfo.firstName}
          editButtonProps={{ style: { marginLeft: '5px' }} }
          showEditButton
        />

        <h5 for= 'lastName'> Last Name:</h5>
         <EditText
          className='lastName'
          defaultValue={user.userInfo.lastName}
          editButtonProps={{ style: { marginLeft: '5px' }} }
          showEditButton
        />

        <h5 for= 'email'> E-mail:</h5>
        <EditText
          className='email'
          defaultValue={user.userInfo.email}
          editButtonProps={{ style: { marginLeft: '5px' }} }
          showEditButton
        />
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
                <EditText
                  className='phone#'
                  defaultValue={user.organizer.phoneNumber}
                  editButtonProps={{ style: { marginLeft: '5px' }} }
                  showEditButton
                />
        
                <h5 for= 'status'> Last Name:</h5>
                <div>{user.organizer.phoneNumber}</div>
        
                {/*  <strong><label className="mr-2">Full Name <small>(read-only)</small>: </label></strong>
                    <EditText id="fullName" name="fullName" defaultValue="Full Name" inline readonly/> */}
                </div>
            )
        }
    }


    return (
        displaytype()
    )
}

export default CustomerInfo;