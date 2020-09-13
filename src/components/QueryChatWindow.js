import React from 'react'
import QueryChatForm from './QueryChatForm';
import QueryChat from './QueryChat';

function QueryChatWindow () {

    return (
        <div>
            <div className="chatScreenWrapper">
                <QueryChat />
                <QueryChatForm />
            </div>
        </div>
    )
}

export default QueryChatWindow;
