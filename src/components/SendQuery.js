import React, { useState } from "react";
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

function SendQuery({handleSendQuery, logoutUser, userHash}) {

    const [subject, setSubject] = useState("");
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");

    const handleLocationChange = (location) => {
        setLocation(location);
    }

    function validateForm() {
        return subject.length > 0 && query.length > 0 && location.length > 0;
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
            <form onSubmit={handleSendQuery.bind(this, subject, query, location)}>
                <div className="field">
                    <input type="text" id="username" className="input" placeholder="Subject" value={subject} onChange={e => setSubject(e.target.value)} />
                </div>
                <div className="field locationDropDown">
                <label>Location: </label>
                    <select name="location" value={location} onChange={event => handleLocationChange(event.target.value)}>
                        <option id="APAC - India">APAC - India</option>
                        <option id="APAC - Thailand">APAC - Thailand</option>
                        <option id="IL - Be'er Sheva">IL - Be'er Sheva</option>
                        <option id="IL - Ramat Gan">IL - Ramat Gan</option>
                        <option id="UK - London">UK - London</option>
                        <option id="US - LA">US - LA</option>
                        <option id="US - NY">US - NY</option>
                    </select>
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
