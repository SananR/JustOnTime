import React, {useState} from "react";
import "./signup.css";

function Signup() {

    const [errorName, setErrorName] = useState("");
    const [errorLastname, setErrorLastname] = useState("");
    const [errorEmail, setErrorEmail] = useState("");
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

        const values = [Name, Lastname, Email, Address, City, Country, Code, Password, Confirm]; 
        const names = ["Name", "Lastname", "Email", "Address", "City", "Country", "Code", "Password", "Confirm"]; 
        const funcs = [setErrorEmail, setErrorName, setErrorLastname, setErrorAddr, 
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
            // Phone is an optional field 
        }

    }


    const renderForm = (
        <div className= "Signup-cont">
            <div className="title">Sign Up</div>
            <form onSubmit={handleSubmit}>
            <div className="wrapper">
                <div className="Name-input">
                <label id= "name-label">Name:</label> 
                <input id= "Name" type= "text" placeholder= "Name"/>
                {errorName && <div className="error"> {errorName} </div>}
                </div>

                <div className="Lastname-input">
                <label id= "Lastname-label">Last Name:</label> 
                <input id= "Lastname" type= "text" placeholder= "Last Name"/>
                {errorLastname && <div className="error"> {errorLastname} </div>}
                </div> 
            </div>
               

                <div className="Email-input">
                <label id= "email-label">Email:</label> 
                <input id= "Email" type= "text" placeholder= "Enter Email"/>
                {errorEmail && <div className="error"> {errorEmail} </div>}
                </div>

                <div className="Phone-input">
                <label id= "Phone-label">Phone Number:  <p id= "help">(optional)</p> </label> 
                <input id= "Phone" type= "text" placeholder= "Enter Phone Number"/>
                </div>

                <div className="Address-wrapper">
                <label id= "Address-label">Address:</label> 
                <input id= "Address" type= "text" placeholder= "Enter Address"/>
                {errorAddr && <div className="error"> {errorAddr} </div>}

                <label id= "city-label">City:</label> 
                <input id= "City" type= "text" placeholder= "Enter City"/>
                {errorCity && <div className="error"> {errorCity} </div>}

                <label id= "country-label">Country:</label> 
                <input id= "Country" type= "text" placeholder= "Enter Country"/>
                {errorCountry && <div className="error"> {errorCountry} </div>}

                <label id= "code-label">Postal Code:</label> 
                <input id= "Code" type= "text" placeholder= "Enter Postal Code"  
                pattern="[A-Za-z][0-9][A-Za-z] [0-9][A-Za-z][0-9]" />
                <p id= "help">Format A1A 1A1</p>
                {errorCode && <div className="error"> {errorCode} </div>}

                </div>

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

                <div className="signup-buttons"> 
                <a id= "signin-button" href="/login">Already have an account</a>
                <button id= "signup-button">Sign Up</button>
                </div>
            </form>
        </div>
    )

    return (
        <div className="Signup">
            {renderForm}
        </div>
    );
}
   export default Signup;
  