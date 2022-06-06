import React, {useState} from "react";
import "./signup.css";

function Signup() {

    const [errorEmail, setErrorEmail] = useState("");
    const [errorName, setErrorName] = useState("");
    const [errorLastname, setErrorLastname] = useState("");
    const [errorPassword, setErrorPassword] = useState("");
    const [errorConfirm, setErrorConfirm] = useState("");


     const errors = {
        emailtaken: "Email has already been used for an account",
        passnotfound: "Invalid Password",
        passmatch: "Passwords must match to continue",
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var Email = document.getElementById("Email").value; 
        var Name = document.getElementById("Name").value; 
        var Lastname = document.getElementById("Lastname").value; 
        var Password = document.getElementById("Pass").value;
        var Confirm = document.getElementById("Conf").value; 

        const values = [Email, Name, Lastname, Password, Confirm]; 
        const names = ["Email", "Name", "Lastname", "Password", "Confirm"]; 
        const funcs = [setErrorEmail, setErrorName, setErrorLastname, setErrorPassword, setErrorConfirm]
        var empty = 0
        for (var i in values){
            if(values[i] === "" ){
                funcs[i](names[i] + " Required")
                empty++;
            } else {
                funcs[i]("")
            }
        }

        if(empty == 0 ){
            //validate all fields required fields
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
                <label id= "user-label">Email:</label> 
                <input id= "Email" type= "text" placeholder= "Enter Email"/>
                {errorEmail && <div className="error"> {errorEmail} </div>}
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
  