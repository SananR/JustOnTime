import React, {useState} from "react";
import "./login.css";

function Login() {

    const [errorMessageUser, setErrorMessageUser] = useState("");
    const [errorMessagePass, setErrorMessagePass] = useState("");

     const errors = {
        username: "Username Required",
        usernotfound: "Username not found",
        password: "Password Required",
        passnotfound: "Invalid Password"
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        var User = document.getElementById("User").value; 
        var Pass = document.getElementById("Pass").value;
        
        if(User === "" || Pass === ""){
            if (User === ""  && Pass === ""){
                setErrorMessageUser(errors.username)
                setErrorMessagePass(errors.password)
            } else if (User === ""){
                setErrorMessagePass("")
                setErrorMessageUser(errors.username)
            } else if (Pass === "") {
                setErrorMessageUser("")
                setErrorMessagePass(errors.password)
            }
        } else {
            console.log(User)
            console.log(Pass)
            //if password and username are valid 
            // setUserErrorMessage("")
            // setPassErrorMessagse("")
            // setMessage("Login Success")
            //redirect 
            // else if user invalid 
            // setUserErrorMessage(errors.usernotfound)
            // setPassErrorMessage("")
            // setMessage("")
            // else if password invalid 
            // setUserErrorMessage(errors.password)
            // setPassErrorMessage("")
            // setMessage("")

        }


    }


    const renderForm = (
        <div className= "Login-cont">
            <div className="title">Login</div>
            <form onSubmit={handleSubmit}>
                <div className="User-input">
                <label id= "user-label">Username:</label> 
                <input id= "User" type= "text" placeholder= "Enter Username"/>
                {errorMessageUser && <div className="error"> {errorMessageUser} </div>}
                </div>

                <div className="Pass-input">
                <label id= "pass-label">Password:</label> 
                <input id= "Pass" type= "password" placeholder= "Enter Password"/>
                {errorMessagePass && <div className="error"> {errorMessagePass} </div>}
                </div>
                <button id= "login-button">Login</button>
            </form>
            
            <a id= "user-button" href= "/signup">New User?</a>

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
              {/*   <div id="grey"></div> */}
                <div id="pink"></div>
               {/*  <div id="red"></div> */}
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
        <div className="Login">
            {renderForm}
            {renderback}
        </div>
    );
}
   export default Login;
  