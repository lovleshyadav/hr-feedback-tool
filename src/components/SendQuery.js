import React, { useState } from "react";

function SendQuery() {

    const [subject, setSubject] = useState("");
    const [query, setQuery] = useState("");

    function validateForm() {
        return subject.length > 0 && query.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Fix: Send original hash instead of fixed one
        var payload = {
            "subject": subject,
            "query": query,
            "userHash": "e172c5654dbc12d78ce1850a4f7956ba6e5a3d2ac40f0925fc6d691ebb54f6bf"
        };

        fetch('/putFeedbacks', {
            method: "POST",
            headers: {
                'Content-type': 'application/json'
            },
            body: JSON.stringify(payload)
        }).then((response) => response.json()).then((result) => {
                console.log(result)
        });
    }
  return (

    <div className="SendQuery">
     <div className="sendQueryTitle">Send Your Query!</div>
    <div className="query">
        <div className="formWrapper">
            <form onSubmit={handleSubmit}>
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
  );
}

export default SendQuery;
