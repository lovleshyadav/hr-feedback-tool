import React, { Component } from 'react'
import QueryChatForm from './QueryChatForm';

class QueryChatFormWrapper extends Component {
    render() {
        return this.props.queryresponse.response.response.map((response) => (
            <QueryChatForm response={response}/>         
        ));
    }
}

export default QueryChatFormWrapper;
