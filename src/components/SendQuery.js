import React, { useState } from "react";
import NavBar from './NavBar';
import { Link, Redirect } from 'react-router-dom';

function SendQuery({handleSendQuery, logoutUser, userHash, redirect, redirectUser}) {

    const [subject, setSubject] = useState("");
    const [query, setQuery] = useState("");
    const [location, setLocation] = useState("");
    const [date, setDate] = useState(""); //incident date
    const [realusername, setRealusername] = useState("");

    const handleLocationChange = (location) => {
        setLocation(location);
    }

    function validateForm() {
        return subject.length > 0 && query.length > 0 && location.length > 0 && date.length > 0;
    }


    if(redirect){
        redirectUser();
        return(<Redirect to='/QueryListTable'  />)
    }
    else{
        return (
            <div>
                <Link onClick={async () => {await logoutUser()}} className="logoutBtn" to={{pathname:'/login'}}>Log out!</Link>
                <NavBar userHash={userHash}/>
                <div className="SendQuery">
                    <div className="sendQueryTitle">Send Your Query!</div>
                    <div className="query">
                        <div className="formWrapper">
                            <form onSubmit={handleSendQuery.bind(this, date, subject, query, location, realusername)}>
                                <div className="field">
                                    <label for="incidentDate">When did the incident occur?<span className="impStar">*</span> </label>
                                    <input type="date" id="incidentDate" name="incidentDate" value={date} onChange={e => setDate(e.target.value)}/>
                                </div>
                                <div className="field">
                                    <input type="text" id="subject" className="input" placeholder="Subject (mandatory)" value={subject} onChange={e => setSubject(e.target.value)} />
                                </div>
                                <div className="field locationDropDown">
                                    <label>Location:<span className="impStar">*</span> </label>
                                    <select name="location" value={location} onChange={event => handleLocationChange(event.target.value)}>
                                        <option id="blank"></option>
                                        <option id="NYC">NYC</option>
                                        <option id="LA">LA</option>
                                        <option id="Tel Aviv">Tel Aviv</option>
                                        <option id="Chicago">Chicago</option>
                                        <option id="London">London</option>
                                        <option id="Madrid">Madrid</option>
                                        <option id="Paris">Paris</option>
                                        <option id="Berlin">Berlin</option>
                                        <option id="Mexico City">Mexico City</option>
                                        <option id="São Paulo">São Paulo</option>
                                        <option id="Seol">Seol</option>
                                        <option id="Sydney">Sydney</option>
                                        <option id="Shanghai">Shanghai</option>
                                        <option id="Tokyo">Tokyo</option>
                                        <option id="Beijing">Beijing</option>
                                        <option id="New Delhi">New Delhi</option>
                                        <option id="Bangkok">Bangkok</option>
                                        <option id="Istanbul">Istanbul</option>
                                        <option id="Seattle">Seattle</option>
                                        <option id="Location not available">Choose not to answer</option>
                                        <option id="Other">Other</option>
                                    </select>
                                </div>
                                <div className="field">
                                    <textarea id="query" className="input" placeholder="Please describe the incident (mandatory)" value={query} onChange={e => setQuery(e.target.value)} />
                                </div>
                                <div className="field">
                                    <input type="text" id="realusername" className="input" placeholder="Enter your name if you wish to identify yourself (optional)" value={realusername} onChange={e => setRealusername(e.target.value)} />
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

  
}

export default SendQuery;
