import React, { useState } from 'react'

function QueryChatForm() {

    const [query, setQuery] = useState("");

    function validateForm() {
        return query.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Fix: Send original hash instead of fixed one
        var payload = {
            // "subject": subject,
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
        <div>
            <div className="chatFormWrapper">
                        <form onSubmit={handleSubmit}>
                            <div className="field">
                                <input id="query" type="text" className="input" placeholder="Type your reply here!" value={query} onChange={e => setQuery(e.target.value)} />
                            </div>
                            <div className="sendQueryChatBtnWrapper">
                                <button className="chatSendQueryBtn" disabled={!validateForm()}></button>
                            </div>
                        </form>
                    </div>
        </div>
    )
}

export default QueryChatForm;
