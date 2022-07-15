import React, { useState, useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {updateUser} from '../../../../services/auth/authSlice.js'
import SettingSidebar from "../../../../components/setting-sidebar/settingSidebar.jsx"
import {StyledEdiText} from './customerInfoStyle.js'
import {FaEnvelope, FaUserAlt, FaPhoneAlt, FaInfo, FaEdit, FaGlobeAmericas} from "react-icons/fa";
import {MdBusiness, MdMarkEmailRead} from "react-icons/md";
import {TbCertificate} from "react-icons/tb";
import {BsShieldFillCheck} from "react-icons/bs"
import {AiFillHome} from "react-icons/ai";
import { HiX, HiCheck} from "react-icons/hi"
import {InputValidator} from "../../../../util/validation/InputValidator"

import './customerInfo.css'


function CustomerInfo() {
    const dispatch = useDispatch(); 
    const {isLoading, isError, isSuccess, message} = useSelector((state) => state.auth)
    const user = useSelector((state) => state.auth.user)
    const [valid, setValid] = useState();
    const [vMessage, setValidationMessage] = useState("");

/* 

    let cityValid = new InputValidator(city).minLength(2).maxLength(15).isValid;
    let provinceValid = new InputValidator(province).minLength(2).maxLength(15).isValid;  */


  
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


    //valisdates if the input was changed in the backend or not and does input validation
    function validate(val, field){
        console.log(val)
        var id; 
        if(field === "firstname"){
            let firstNameValid = new InputValidator(val).minLength(2).maxLength(50).isValid;
            if(!firstNameValid){
                setValidationMessage("Please Enter a valid first name.")
                return false;
            }
            id = {update: { "userInfo.firstName" : val }, id : user._id }
        } else if (field === "lastname"){
            let lastNameValid = new InputValidator(val).minLength(2).maxLength(50).isValid;
            if(!lastNameValid){
                setValidationMessage("Please Enter a valid last name.")
                return false;
            }
            id = {update: { "userInfo.lastName" : val }, id : user._id }
        } else if (field === "phone") {
            let phoneValid = new InputValidator(val).matches(/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).isValid;
            if(!phoneValid){
                setValidationMessage("Please Enter a valid phone number.")
                return false;
            }
            id = {update: { "organizer.info.phoneNumber" : val }, id : user._id }
        } else if (field === "businessName") {
            let businessNameValid = new InputValidator(val).minLength(5).maxLength(15).isValid;
            if(!businessNameValid){
                setValidationMessage("Please Enter a valid business name.")
                return false;
            }
            id = {update: { "organizer.info.businessName" : val }, id : user._id }
        } else if (field === "businessLicense") {
            let businessLicenseValid = new InputValidator(val).minLength(9).maxLength(9).isValid;
            if(!businessLicenseValid){
                setValidationMessage("Please Enter a valid business license.")
                return false;
            }
            id = {update: { "organizer.info.businessLicense" : val }, id : user._id }
        } else if (field === "address") {
            let addressValid = new InputValidator(val).minLength(8).maxLength(50).isValid;
            if(!addressValid){
                setValidationMessage("Please Enter a valid address.")
                return false;
            }
            id = {update: { "organizer.info.address" : val }, id : user._id }
        } else if (field === "postal") {
            let postalValid = new InputValidator(val).minLength(6).maxLength(6).isValid;
            if(!postalValid){
                setValidationMessage("Please Enter a valid postal code.")
                return false;
            }
            id = {update: { "organizer.info.postal" : val }, id : user._id }
        } else if (field === "city") {
            let cityValid = new InputValidator(val).minLength(2).maxLength(15).isValid;
            if(!cityValid){
                setValidationMessage("Please Enter a valid city.")
                return false;
            }
            id = {update: { "organizer.info.city" : val }, id : user._id }
        } else if (field === "province") {
            let provinceValid = new InputValidator(val).minLength(2).maxLength(15).isValid;
            if(!provinceValid){
                setValidationMessage("Please Enter a valid province.")
                return false;
            }
            id = {update: { "organizer.info.province" : val }, id : user._id }
        } else {
            let emailValid = new InputValidator(val).minLength(5).maxLength(50).isValid;
            if(!emailValid){
                setValidationMessage("Please enter a valid email.")
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
                                    value = {user ? user.userInfo.firstName : false}
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
                                value = {user ? user.userInfo.lastName : false}
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
                                        value = {user ? user.userInfo.email : false}
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


    //returns whether the relevant information if the user is an organizer
    const organizer = () => {
        if(user.userType === "Customer"){
            return (<div></div>)
        } else {
            return (
                <div>
                     {/* phone # and status */}
                    <div id="double-div"> 
                        <div id='item'>
                            <h5 id= 'info-label'> Phone Number:</h5> 
                            <div id='single-div'>
                                <FaPhoneAlt className= "icon1" color="red"/>
                                <StyledEdiText
                                        value ={user ? user.organizer.info.phoneNumber : false}
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
                                <div id='unchangeable-div'>{user ? user.organizer.info.verificationStatus : false} </div>
                            </div>
                        </div>
                    </div>
                   
                   {/* business name and license */}
                    <div id= 'double-div'>
                        <div id='item'> 
                            <h5 id= 'info-label'> Business Name:</h5>
                            <div id='single-div'>
                                <MdBusiness className="icon1" color="red"/>
                                <StyledEdiText
                                    value = {user ? user.organizer.info.businessName : false}
                                    onSave={(v) => onSave(v)}
                                    validation={(val) => validate(val, "businessName")}
                                    validationMessage ={vMessage}
                                    hideIcons={true}
                                    editButtonContent={<FaEdit color="red"/>}
                                    saveButtonContent={<HiCheck color="green"/>}
                                    cancelButtonContent={<HiX color="red"/>}
                                /> 
                            </div>
                        </div>
                        <div id='item'> 
                            <h5 id= 'info-label'> Business License:</h5>
                            <div id='single-div'>
                                <TbCertificate className= "icon1" color="red"/>
                                <StyledEdiText
                                    value = {user ? user.organizer.info.businessLicense : false}
                                    onSave={(v) => onSave(v)}
                                    validation={(val) => validate(val, "businessLicense")}
                                    validationMessage ={vMessage}
                                    hideIcons={true}
                                    editButtonContent={<FaEdit color="red"/>}
                                    saveButtonContent={<HiCheck color="green"/>}
                                    cancelButtonContent={<HiX color="red"/>}
                                /> 
                            </div>
                        </div>
                    </div>

                     {/* address  and postal code */}
                     <div id= 'double-div'>
                        <div id='item'> 
                            <h5 id= 'info-label'> Address:</h5>
                            <div id='single-div'>
                                <AiFillHome className= "icon1" color="red"/>
                                <StyledEdiText
                                    value = {user ? user.organizer.info.address : false}
                                    onSave={(v) => onSave(v)}
                                    validation={(val) => validate(val, "address")}
                                    validationMessage ={vMessage}
                                    hideIcons={true}
                                    editButtonContent={<FaEdit color="red"/>}
                                    saveButtonContent={<HiCheck color="green"/>}
                                    cancelButtonContent={<HiX color="red"/>}
                                /> 
                            </div>
                        </div>
                    </div>
                    {/* city  and province */}
                   <div id= 'double-div'>
                            <div id='item'> 
                                <h5 id= 'info-label'> Postal code:</h5>
                                <div id='single-div'>
                                    <FaGlobeAmericas className= "icon1" color="red"/>
                                    <StyledEdiText
                                        value = {user ? user.organizer.info.postal : false}
                                        onSave={(v) => onSave(v)}
                                        validation={(val) => validate(val, "postal")}
                                        validationMessage ={vMessage}
                                        hideIcons={true}
                                        editButtonContent={<FaEdit color="red"/>}
                                        saveButtonContent={<HiCheck color="green"/>}
                                        cancelButtonContent={<HiX color="red"/>}
                                    /> 
                            </div>
                        </div>
                        <div id='item'> 
                            <h5 id= 'info-label'> City:</h5>
                            <div id='single-div'>
                                <FaGlobeAmericas className= "icon1" color="red"/>
                                <StyledEdiText
                                    value = {user ? user.organizer.info.city : false}
                                    onSave={(v) => onSave(v)}
                                    validation={(val) => validate(val, "city")}
                                    validationMessage ={vMessage}
                                    hideIcons={true}
                                    editButtonContent={<FaEdit color="red"/>}
                                    saveButtonContent={<HiCheck color="green"/>}
                                    cancelButtonContent={<HiX color="red"/>}
                                /> 
                            </div>
                        </div>
                        <div id='item'> 
                            <h5 id= 'info-label'> Province:</h5>
                            <div id='single-div'>
                                <FaGlobeAmericas className= "icon1" color="red"/>
                                <StyledEdiText
                                    value = {user ? user.organizer.info.province : false}
                                    onSave={(v) => onSave(v)}
                                    validation={(val) => validate(val, "province")}
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
    if(user === null){
        return (
            <div  className="d-flex justify-content-center align-items-center h2 mt-5">
                <p> Please  <a className="text-danger" href="/login"> login</a> or <a className="text-danger" href="/signup"> register.</a> </p>
            </div>
        )
    } else {
        return (
            displaytype()
        )
    }
}

export default CustomerInfo;