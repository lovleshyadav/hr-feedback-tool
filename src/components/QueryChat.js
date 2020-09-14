import React, { Component } from 'react'
import ChatResponse from './ChatResponse';

class QueryChat extends Component {

    render(){
        // console.log(this.props.queryresponse.response.response);

        return this.props.queryresponse.response.response.map((response) => (
            <ChatResponse response={response}/>         
        ));
    }
}

export default QueryChat;
