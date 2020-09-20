import React, { Component } from 'react'
import QueryChatForm from './QueryChatForm';
import QueryChat from './QueryChat';
// import {addUserHash, getUserFeedbacks, isLoggedIn} from "../actions";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';

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
        if (this.props.location) {
            if (this.props.location.queryresponse) {
                this.queryresponse = this.props.location.queryresponse;
            }
        }

        if (this.props.querylist.length > 0) {
            let obj = this.props.querylist.find(o => o.id === this.props.selectedFeedback)
            this.queryresponse.response = obj;
        }

        return (
            <div>
                <Link className="logoutBtn" to={{
                    pathname:'/login',
                    
                }} >Log out!</Link>
                <div className="chatScreenWrapper">
                    <div className="backBtnWrapper">
                    <Link className="backBtn" to={{
                    pathname:'/QueryListTable',
                    queryresponse:{
                        response: this.props.query
                    },
                    userHash: this.props.userHash
                }} >Back</Link>
                    </div>
                
                    <div className="queryChatWindow">
                        <QueryChat queryresponse={this.queryresponse}/>
                    </div>
                    <QueryChatForm userHash={this.props.userHash} queryresponse={this.queryresponse} addUserresponse={this.props.addUserresponse}/>
                </div>
            </div>

        )
    }
    
}

const mapStateToProps = (state) => {
    return {
        selectedFeedback: state.selectedFeedback
    }
};

const mapDispatchToProps = () => {
    return {
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(QueryChatWindow);
