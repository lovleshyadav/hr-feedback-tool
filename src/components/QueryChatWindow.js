import React, { Component } from 'react'
import QueryChatForm from './QueryChatForm';
import QueryChat from './QueryChat';

class QueryChatWindow extends Component {
    queryresponse = {response: {response: [
        {
            "user": "normal",
            "response": "No chat found yet, please contact the admin",
            "date": "",
            "time": ""
        }
    ]}};
    render(){
        if (this.props.location.queryresponse) {
            this.queryresponse = this.props.location.queryresponse;
        }
        return (
            <div className="chatScreenWrapper">
                <div className="queryChatWindow">
                    <QueryChat queryresponse={this.queryresponse}/>
                </div>
                <QueryChatForm userHash={this.props.location.userHash} queryresponse={this.queryresponse}/>
            </div>

        )
    }
    
}

export default QueryChatWindow;
