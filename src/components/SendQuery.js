import React, { useState } from "react";
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

function SendQuery({handleSendQuery, logoutUser, userHash}) {

    const [subject, setSubject] = useState("");
    const [query, setQuery] = useState("");

    function validateForm() {
        return subject.length > 0 && query.length > 0;
    }

  return (

    <div>
        <Link onClick={async () => {await logoutUser()}} className="logoutBtn" to={{
            pathname:'/login'
        }} >Log out!</Link>

<NavBar userHash={userHash}/>

    <div className="SendQuery">
     <div className="sendQueryTitle">Send Your Query!</div>
    <div className="query">
        <div className="formWrapper">
            <form onSubmit={handleSendQuery.bind(this, subject, query)}>
                <div className="field">
                    <input type="text" id="username" className="input" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
                </div>
                <div className="field">
                    <textarea id="query" className="input" placeholder="Query" value={query} onChange={e => setQuery(e.target.value)} />
                </div>
                <div className="sendQueryBtnWrapper">
                    <button className="sendQueryBtn" disabled={!validateForm()}>Send!</button>
                </div>
            </form>
        </div>
    </div>

    </div>
    </div>
  );
}

export default SendQuery;
