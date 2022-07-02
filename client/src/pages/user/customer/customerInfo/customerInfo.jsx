import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../../../../services/auth/authSlice.js'
import SettingSidebar from "../../../../components/setting-sidebar/settingSidebar.jsx"
import {StyledEdiText} from './customerInfoStyle.js'
import {FaEnvelope, FaUserAlt, FaPhoneAlt, FaInfo, FaEdit} from "react-icons/fa";
import { HiX, HiCheck} from "react-icons/hi"

import './customerInfo.css'


function CustomerInfo() {
    const dispatch = useDispatch(); 
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
    var user = useSelector((state) => state.auth.user)
    const [valid, setValid] = useState();
    const [vMessage, setValidationMessage] = useState("");
  
    //saves the data enteredon screen if the requets was validated by the validator 
    function onSave (v){
        console.log(v);
        setValidationMessage(''); 
    }

    //updates the erros if any occor with the store
    useEffect(() => {
        //login failed
        if (isError) {
           console.log("error");
           setValid(false); 

        }
        if (isSuccess /* TODO: uncomment */ /*|| user */) {
            console.log('success');
            setValid(true); 
        }
        if(isLoading){
            console.log("loading");
        }
    }, [user, isError, isSuccess, message, isLoading]);


    //valisdates if the input was changed in tehe backend or not and does input validation
    function validate(val, field){
        console.log(val)
        if(val.length < 3 || val.length > 50 ){
           setValidationMessage("New value must be between 3-50 characters"); 
            return false; 
        } 
        var id; 
        if(field === "firstname"){
            id = {update: { "userInfo.firstName" : val }, id : user._id }
        } else if (field === "lastname"){
            id = {update: { "userInfo.lastName" : val }, id : user._id }

        } else if (field === "phone") {
            id = {update: { "organizer.phoneNumber" : val }, id : user._id }
        } else {
            if(val.length < 5){
                setValidationMessage("Emails must have atleat 5 characters")
                return false; 
            }
            id = {update: { "userInfo.email" : val }, id : user._id }
        }
        dispatch(updateUser(id)); 
        if(!isLoading){
            if(valid){
                setValidationMessage(''); 
                return valid;
            }
            setValidationMessage("This field could not be updated. Please try again."); 
            return valid; 
        }
    }

    //stores the user info common to all users 
    const basicInfo = (

            <div > 
                <h1 id ="personal-info-title">Personal Information</h1>
                <div id= 'double-div'>
                    <div id='item'> 
                        <h5 id= 'info-label'> First Name:</h5>
                            <div id='single-div'>
                                <FaUserAlt className= "icon1" color="red"/>
                                <StyledEdiText
                                    value = {user.userInfo.firstName}
                                    onSave={(v) => onSave(v)}
                                    validation={(val) => validate(val, "firstname")}
                                    validationMessage ={vMessage}
                                    hideIcons={true}
                                    editButtonContent={<FaEdit color="red"/>}
                                    saveButtonContent={<HiCheck color="green"/>}
                                    cancelButtonContent={<HiX color="red"/>}
                                /> 
                            </div>
                    </div>
                    <div id='item'> 
                        <h5 id= 'info-label'> Last Name:</h5>
                        <div id='single-div'>
                            <FaUserAlt className= "icon1" color="red"/>
                            <StyledEdiText
                                value = {user.userInfo.lastName}
                                onSave={(v) => onSave(v)}
                                validation={(val) => validate(val, "lastname")}
                                validationMessage ={vMessage}
                                hideIcons={true}
                                editButtonContent={<FaEdit color="red"/>}
                                saveButtonContent={<HiCheck color="green"/>}
                                cancelButtonContent={<HiX color="red"/>}
                            /> 
                        </div>
                    </div>
                </div>
            
                <div id="double-div"> 
                    <div id='item'>
                            <h5 id= 'info-label'> E-mail:</h5> 
                            <div id='single-div'>
                                <FaEnvelope className= "icon1" color="red"/>
                                <StyledEdiText
                                        value = {user.userInfo.email}
                                        onSave={(v) => onSave(v)}
                                        validation={(val) => validate(val, "email")}
                                        validationMessage ={vMessage}
                                        hideIcons={true}
                                        editButtonContent={<FaEdit color="red"/>}
                                        saveButtonContent={<HiCheck color="green"/>}
                                        cancelButtonContent={<HiX color="red"/>}
                                /> 
                            </div>
                    </div>
                </div>
            </div>

    )

    //creates the title for the accounts page
    const title = (
        <div>
            <h1 id= "title-personal"> Account Settings</h1>
            <p id="subtitle-personal"> Change your account details</p>
        </div>
    )

    // sidebar is meant to hold links that will lead to new pages relating to account details 
    //as we need them
  /*   const sidebar = (
        <div id="sidebar-cont">
                <a href='/personal-info' > <span id='sidebar-nav'> Personal Information</span></a>
         </div>
    ) */


    //returns whether the relevan tinformation if the user is an organizer
    const organizer = () => {
        if(user.userType === "Customer"){
            return (<div></div>)
        } else {
            return (
                <div id="double-div"> 
                            <div id='item'>
                                <h5 id= 'info-label'> Phone Number:</h5> 
                                <div id='single-div'>
                                    <FaPhoneAlt className= "icon1" color="red"/>
                                    <StyledEdiText
                                            value ="number"
                                            onSave={(v) => onSave(v)}
                                            validation={(val) => validate(val, "phone")}
                                            validationMessage ={vMessage}
                                            hideIcons={true}
                                            editButtonContent={<FaEdit color="red"/>}
                                            saveButtonContent={<HiCheck color="green"/>}
                                            cancelButtonContent={<HiX color="red"/>}
                                    /> 
                                </div>
                            </div>
                            <div id='item'>
                                <h5 id= 'info-label'> Status:</h5>
                                <div id= 'single-div'>
                                    <FaInfo  className= "icon1" color="red"/>
                                   <div id='unchangeable-div'>status </div>
                                </div>
                            </div>
                        </div>
            )
        }
    }

    const displaytype = () => {
            return (
            <div>
                {title}
                <div id='personal-info-cont' className="gx-0 mt-4 mb-5 container">
                   <SettingSidebar/>
                    <div id='info-cont'>
                        {basicInfo}
                        {organizer()}
                    </div>
                </div>
                
            </div>
            )
        }

//displays the correct information dependind on whether the user is customer or organizer 
    return (
        displaytype()
    )
}

export default CustomerInfo;