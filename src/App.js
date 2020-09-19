import React, {Component} from 'react';
import {BrowserRouter as Router, NavLink } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import {connect} from "react-redux";
import {addUserHash, isLoggedIn, getUserFeedbacks} from "./actions";

import Login from './components/Login';
import SendQuery from './components/SendQuery';
import QueryListTable from './components/QueryListTable';
import QueryChatWindow from './components/QueryChatWindow';

import './App.css';
import {sha256} from "js-sha256";
import {selectFeedback} from "./actions";
import {QueryItem} from "./components/QueryItem";

class App extends Component {

  state = {
      loggedIn: false,
      querylist: [],
      userHash: ""

  }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        // this.callBackendAPI()
        //     .then(res => this.setState({querylist: res.data}))
        //      .catch(err => console.log(err));
    }
    // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    callBackendAPI = async () => {
        const response = await fetch('/getFeedbacks');
        const body = await response.json();
        console.log(body);
        if (response.status !== 200) {
            throw Error(body.message)
        }
        return body;
    };

  toggleImportant = (id) => {
    this.setState({ querylist: this.state.querylist.map(
      queryItem =>{
        if(queryItem.id===id){
          queryItem.important = !queryItem.important
        }

        if(queryItem.id===id && queryItem.impBtnValue==='important'){
          queryItem.impBtnValue = 'unimportant'
        }
        else if(queryItem.id===id && queryItem.impBtnValue==='unimportant'){
          queryItem.impBtnValue = 'important'
        }
        return queryItem;
      }
    ) })
}

toggleRead = (id) => {
  this.setState({ querylist: this.state.querylist.map(
    queryItem =>{
      if(queryItem.id===id){
        queryItem.read = !queryItem.read
      }

      if(queryItem.id===id && queryItem.readBtnValue==='read'){
        queryItem.readBtnValue = 'unread'
      }
      else if(queryItem.id===id && queryItem.readBtnValue==='unread'){
        queryItem.readBtnValue = 'read'
      }
      return queryItem;
    }
  ) })
}

// This will fetch Query list on the basis of hash provided on login
handleLogin = async (email,password,event) => {

    // Validation is not required here, so we just need to update the state
    let userHash = sha256(email+password);

    this.setState({userHash: userHash, loggedIn: true} );

    // Now get user queries
    var payload = {
        "userHash": userHash
    };

    // Updating redux file
    this.props.isLoggedIn();

    // Query list is now updated
    await fetch('/getUserFeedbacks', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(async (response) => response.json()).then(async (result) => {
        await this.setState({querylist: result.data});
        await this.props.getUserFeedbacks(result.data);
        await this.props.addUserHash(userHash);
    });

    event.preventDefault();
};

handleSendQuery = async (subject,query,event) => {
    event.preventDefault();

    // Sending new query to DB
    var payload = {
        "subject": subject,
        "query": query,
        "userHash": this.state.userHash
    };

    await fetch('/putFeedbacks', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(async (response) => response.json()).then(async (result) => {
        await this.setState({querylist: result.data})
    });
};

addUserresponse = async (response, queryId, userHash, event) => {
    event.preventDefault();

    // Send the response to DB
    var payload = {
        "userHash": userHash,
        "queryId": queryId,
        "response": response
    };

    fetch('/responseToQuery', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => response.json()).then(async (result) => {
        await this.setState({querylist: result.data})
    });

    // Now get user queries
    // var payload = {
    //     "userHash": this.state.userHash
    // };
    //
    // // Query list is now updated
    // await fetch('/getUserFeedbacks', {
    //     method: "POST",
    //     headers: {
    //         'Content-type': 'application/json'
    //     },
    //     body: JSON.stringify(payload)
    // }).then(async (response) => response.json()).then(async (result) => {
    //     await this.setState({querylist: result.data})
    // });
};

  render(){
      return (
          <Router>
            <div className="App">
              <div className="NavBarWrapper">
                <div className="NavBar">
                  <NavLink className="NavItems"  to="/sendquery" activeStyle={{color: '#fff', background: '#3c72a7'}}>To Send query</NavLink>
                  <NavLink className="NavItems" to='/QueryListTable' activeStyle={{color: '#fff', background: '#3c72a7'}} render={props => (<QueryListTable {...props} querylist={this.state.querylist}/>)}>To query list</NavLink>
                </div>
              </div>
            <Route path="/" exact component={ () => <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/> }/>
            <Route path="/login" component={ () => <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/> }/>
            <Route path="/sendquery" component={() => <SendQuery userHash={this.state.userHash} handleSendQuery={this.handleSendQuery}/>}/>
            <Route path="/QueryListTable" component={() => <QueryListTable querylist={this.state.querylist} userHash={this.state.userHash} toggleImportant={this.toggleImportant} toggleRead={this.toggleRead} />} />
            <Route path="/queryChatWindow" component={() => <QueryChatWindow userHash={this.state.userHash} querylist={this.state.querylist} addUserresponse={this.addUserresponse}/>}/>
          </div>
          </Router>
      );
  }
  
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = () => {
    return {
        addUserHash,
        isLoggedIn,
        getUserFeedbacks
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(App);
