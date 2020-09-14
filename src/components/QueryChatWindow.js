import React, { Component } from 'react'
import QueryChatForm from './QueryChatForm';
import QueryChat from './QueryChat';

class QueryChatWindow extends Component {

    render(){
        // console.log(this.props.location.queryresponse);
        return (
            <div className="chatScreenWrapper">
                <div className="queryChatWindow">
                    <QueryChat queryresponse={this.props.location.queryresponse}/>
                </div>
                <QueryChatForm />
            </div>

        )
    }
    
}

export default QueryChatWindow;
