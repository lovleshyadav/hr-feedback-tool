import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

function Login({handleLogin,loggedIn}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    if (loggedIn)
        return(<Redirect push to="/QueryListTable"/>);


  return (
    <div className="login">
        <div className="loginFormWrapper">
            <div className="loginFormTitle">Login <span className="loginHelp">?</span></div>
            <div className="loginForm">
                <form onSubmit={handleLogin.bind(this, email, password)}>
                    <div className="field">
                        <span>Username:</span>
                        <input type="text" id="username" className="input" placeholder="" value={email} onChange={e => setEmail(e.target.value)} />
                    </div>
                    <div className="field">
                        <span>Password:</span>
                        <input type="password" id="password" className="input" placeholder="" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <div className="loginBtnWrapper">
                        <button className="loginBtn" disabled={!validateForm()} >Login</button>
                    </div>
                </form>
            </div>
        </div>
        <div className="loginImg"></div>
        <div className="loginDisclaimer">
            Disclaimer: <p>we do not store any information provided here and so we will not be able to retrive your account in case you forget your username and password so please keep it stored somewhere</p>
        </div>
        
    </div>
  );
}

export default Login;
