import React, { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
// import {}
function QueryChatForm({userHash, queryresponse, addUserresponse}) {

    const [query, setQuery] = useState("");
    const feedbacks = useSelector(state => state.feedbacks);

    function validateForm() {
        return query.length > 0;
    }

    function handleSubmit(event) {
        event.preventDefault();

        // Send the response to DB
        var payload = {
            "userHash": userHash,
            "queryId": queryresponse.response.id,
            "response": query
        };

        fetch('/responseToQuery', {
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
                        <form onSubmit={addUserresponse.bind(this, query, queryresponse.response.id, userHash)}>
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
