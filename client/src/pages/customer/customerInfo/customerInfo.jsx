import React, { useState } from 'react'
import { EditText, EditTextarea } from 'react-edit-text';
import 'react-edit-text/dist/index.css';


function CustomerInfo() {
    //get user from local storage because assume the user is logged in and authenticated at this point  
    //change these lines if its not local starage or the data changes

    const user = JSON.parse(localStorage.getItem('user'));


    return (
        <div>
            <h1>Personal Info </h1>
            <EditText
              className='firstName'
              defaultValue={user.firstName}
              editButtonProps={{ style: { marginLeft: '5px' }} }
              showEditButton
            />

             <EditText
              className='lastName'
              defaultValue={user.lastName}
              editButtonProps={{ style: { marginLeft: '5px' }} }
              showEditButton
            />

            <EditText
              className='email'
              defaultValue={user.email}
              editButtonProps={{ style: { marginLeft: '5px' }} }
              showEditButton
            />


        </div>
    )
}

export default CustomerInfo;