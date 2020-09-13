import React, { useState } from "react";
import { sha256 } from 'js-sha256';

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

    function handleSubmit(event) {
        // Validation is not required here, so we just need to update the state
        console.log(email+ ' ' +password);
        console.log(sha256(email+password));

        // Fix: Call API "getUserFeedbacks", it will give query list based on "userHash"
        //admin admin, user user, test test (try these users)

        // this.props.handleLogin(sha256(email+password));
        // console.log(this.props.history);
        // this.props.history.push('/QueryListTable/');
        // handleLogin(sha256(email+password));
        event.preventDefault();
    }
  return (
    <div className="login">
        <div className="loginFormWrapper">
            <div className="loginFormTitle">Log In</div>
            <div className="loginForm">
                <form onSubmit={handleSubmit}>
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
        
    </div>
  );
}

export default Login;
