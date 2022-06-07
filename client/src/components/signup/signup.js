import React, {useState} from "react";
import { render } from "react-dom";
import "./signup.css";

function Signup() {

    const [errorName, setErrorName] = useState("");
    const [errorLastname, setErrorLastname] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
    const [errorPhone, setErrorPhone] = useState("");
    const [errorAddr, setErrorAddr] = useState("");
    const [errorCity, setErrorCity] = useState("");
    const [errorCountry, setErrorCountry] = useState("");
    const [errorCode, setErrorCode] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirm, setErrorConfirm] = useState("");


    const handleSubmit = (e) => {
        e.preventDefault();

        var Name = document.getElementById("Name").value; 
        var Lastname = document.getElementById("Lastname").value;
        var Email = document.getElementById("Email").value;  
        var Address = document.getElementById("Address").value; 
        var City = document.getElementById("City").value; 
        var Country = document.getElementById("Country").value; 
        var Code = document.getElementById("Code").value; 
        var Password = document.getElementById("Pass").value;
        var Confirm = document.getElementById("Conf").value; 
        var Phone = document.getElementById("Phone"); 

        const values = [Name, Lastname, Email, Phone, Address, City, Country, Code, Password, Confirm]; 
        const names = ["Name", "Lastname", "Email", "Phone", "Address", "City", "Country", "Code", "Password", "Confirm"]; 
        const funcs = [setErrorName, setErrorLastname, setErrorEmail, setErrorPhone, setErrorAddr,
            setErrorCity, setErrorCountry, setErrorCode, setErrorPassword, setErrorConfirm]
        var empty = 0
        for (var i in values){
            if(values[i] === "" ){
                funcs[i](names[i] + " Required")
                empty++;
            } else {
                funcs[i]("")
            }
        }

        //validate all required fields
        if(empty == 0 ){
           /*  when validating remember the address variable holds 
            the suite number and the street name */
        }

    }


    const renderForm = (
        <div className= "Signup-cont">
            <div className="title">Create a new account</div>
            <div className="sub">Get Started</div>

            <form onSubmit={handleSubmit}>
            <div className="wrapper">
                <div className="Name-input">
                <label id= "name-label">First Name:</label> 
                <input id= "Name" type= "text" placeholder= "Enter First Name"/>
                {errorName && <div className="error"> {errorName} </div>}
                </div>

                <div className="Lastname-input">
                <label id= "Lastname-label">Last Name:</label> 
                <input id= "Lastname" type= "text" placeholder= "Enter Last Name"/>
                {errorLastname && <div className="error"> {errorLastname} </div>}
                </div> 
            </div>
            
            <div className="wrapper">
                <div className="Email-input">
                <label id= "email-label">Email:</label> 
                <input id= "Email" type= "text" placeholder= "Enter Email"/>
                {errorEmail && <div className="error"> {errorEmail} </div>}
                </div>

                <div className="Phone-input">
                <label id= "Phone-label">Phone Number: </label> 
                <input id= "Phone" type= "text" placeholder= "Enter Phone Number"/>
                </div>
            </div>

                
                <label id= "Address-label">Street:</label> 
                <input id= "Address" type= "text" placeholder= "Enter Street Address (e.g 123 Main St)"/>
                {errorAddr && <div className="error"> {errorAddr} </div>}

             <div className="wrapper">
             <div className="Email-input">
                 <label id= "city-label">City:</label> 
                 <input id= "City" type= "text" placeholder= "Enter City"/>
                 {errorCity && <div className="error"> {errorCity} </div>}
                 </div>

                 <div className="Phone-input">
                 <label id= "country-label">Country:</label> 
                 <input id= "Country" type= "text" placeholder= "Enter Country"/>
                 {errorCountry && <div className="error"> {errorCountry} </div>}
                 </div>
             </div>

                <label id= "code-label">Postal Code:</label> 
                <input id= "Code" type= "text" placeholder= "Enter Postal Code (e.g A1A 1A1)"  
                pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" />
                {errorCode && <div className="error"> {errorCode} </div>}

                <div className="Password-input">
                <label id= "pass-label">Password:</label> 
                <input id= "Pass" type= "password" placeholder= "Enter Password"/>
                {errorPassword && <div className="error"> {errorPassword} </div>}
                </div>
                
                <div className="Conf-input">
                <label id= "Conf-label">Confirm Password:</label> 
                <input id= "Conf" type= "password" placeholder= "Confirm Password"/>
                {errorConfirm && <div className="error"> {errorConfirm} </div>}
              
                </div>
                <button id= "signup-button">Sign Up</button>

            </form>


            <a id= "signin-button" href="/login">Already have an account?</a>

        </div>
    )

    const renderback = (
        <div className="tris">
            <div id="tri1">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>
            <div id="tri2">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>
            <div id="tri3">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri4">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri5">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri6">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri7">
                <div id="pink"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri8">
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri9">
            <div id="grey"></div>
                <div id="red2"></div>
                <div id="pink2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri10">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>
            <div id="tri11">
                <div id="grey"></div>
                <div id="pink"></div>
                <div id="red"></div>
                <div id="lightgrey"></div>
                <div id="grey2"></div>
                <div id="pink2"></div>
                <div id="red2"></div>
                <div id="lightgrey2"></div>
            </div>

            <div id="tri12">
                <div id="lightgrey"></div>
            </div>
            
        </div>
    )

    return (
        <div className="Signup">
            {renderForm}
            {renderback}
        </div>
    );
}
   export default Signup;
  