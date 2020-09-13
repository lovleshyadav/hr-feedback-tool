import React, { useState } from "react";

function Login({handleLogin}) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function validateForm() {
        return email.length > 0 && password.length > 0;
    }

  return (
    <div className="login">
        <div className="loginFormWrapper">
            <div className="loginFormTitle">Log In</div>
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
        
    </div>
  );
}

export default Login;
