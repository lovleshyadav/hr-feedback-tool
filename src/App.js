import React, {Component} from 'react';
import {BrowserRouter as Router } from 'react-router-dom';
import Route from 'react-router-dom/Route';
import {connect} from "react-redux";
import {addUserHash, isLoggedIn, getUserFeedbacks} from "./actions";
import crypto from 'crypto';

import Login from './components/Login';
import SendQuery from './components/SendQuery';
import QueryListTable from './components/QueryListTable';
import QueryChatWindow from './components/QueryChatWindow';

import './App.css';
import {sha256} from "js-sha256";
import configFile from './reactConfig.json';

class App extends Component {

  state = {
      loggedIn: false,
      querylist: [],
      userHash: "",
      redirect: false
  };

    // componentDidMount() {
    //     // Call our fetch function below once the component mounts
    //     // this.callBackendAPI()
    //     //     .then(res => this.setState({querylist: res.data}))
    //     //      .catch(err => console.log(err));
    // }
    // // Fetches our GET route from the Express server. (Note the route we are fetching matches the GET route from server.js
    // callBackendAPI = async () => {
    //     const response = await fetch('/getFeedbacks');
    //     const body = await response.json();
    //     console.log(body);
    //     if (response.status !== 200) {
    //         throw Error(body.message)
    //     }
    //     return body;
    // };

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
};

encryptMessage = async (text) => {
    let iv = await crypto.randomBytes(configFile.IVLength);
    let cipher = await crypto.createCipheriv(configFile.algorithm, Buffer.from(configFile.normalHash, 'hex'), iv);
    let encrypted = await cipher.update(text);
    encrypted = await Buffer.concat([encrypted, cipher.final()]);
    return iv.toString('hex') + ':' + encrypted.toString('hex');
};

decryptMessage = async (text) => {
    let textParts = await text.split(':');
    let iv = await Buffer.from(textParts.shift(), 'hex');
    let encryptedText = await Buffer.from(textParts.join(':'), 'hex');
    let decipher = await crypto.createDecipheriv(configFile.algorithm, Buffer.from(configFile.normalHash, 'hex'), iv);
    let decrypted = await decipher.update(encryptedText);
    decrypted = await Buffer.concat([decrypted, decipher.final()]);
    console.log("Decrypted: ", decrypted.toString());
    return decrypted.toString();
};

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
        // let decryptedQueryList = result.data.map( async obj => {
        //     let decryptObject = {};
        //     decryptObject.subject = this.decryptMessage(obj.querySubject);
        //     decryptObject.query = this.decryptMessage(obj.queryBody);
        //     decryptObject.location = this.decryptMessage(obj.location);
        //     decryptObject.id = obj.id;
        //     decryptObject.read = obj.read;
        //     decryptObject.important = obj.important;
        //     decryptObject.status = obj.status;
        //     decryptObject.impBtnValue = obj.impBtnValue;
        //     decryptObject.readBtnValue = obj.readBtnValue;
        //     decryptObject.userHash = obj.userHash;
        //     decryptObject.date = obj.date;
        //     decryptObject.time = obj.time;
        //     decryptObject.response = obj.response.map( userResponses => {
        //         let decrypteedResponse = {};
        //         decrypteedResponse.response = this.decryptMessage(userResponses.response);
        //         decrypteedResponse.user = userResponses.user;
        //         decrypteedResponse.date = userResponses.date;
        //         decrypteedResponse.time = userResponses.time;
        //         return userResponses;
        //     });
        //     return decryptObject;
        // });
        result.data.map(obj => {
            this.decryptMessage(obj.querySubject);
        });
        await this.setState({querylist: result.data});
        await this.props.getUserFeedbacks(result.data);
        await this.props.addUserHash(userHash);
    });

    event.preventDefault();
};

handleSendQuery = async (subject,query,location,event) => {
    event.preventDefault();

    // Sending new query to DB
    var payload = {
        "subject": this.encryptMessage(subject),
        "query": this.encryptMessage(query),
        "userHash": this.state.userHash,
        "location": this.encryptMessage(location)
    };

    await fetch('/putFeedbacks', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then(async (response) => response.json()).then(async (result) => {
        let decryptedQueryList = result.data.map( async obj => {
            obj.subject = await this.decryptMessage(obj.querySubject);
            obj.query = await this.decryptMessage(obj.queryBody);
            obj.location = await this.decryptMessage(obj.location);
            obj.response = await obj.response.map( async userResponses => {
                userResponses.response = await this.decryptMessage(userResponses.response);
                return userResponses;
            });
            return obj;
        });
        await this.setState({querylist: decryptedQueryList, redirect: true});
    });
};

logoutUser = async () => {
    await this.setState({loggedIn: false, querylist: []} );
};
redirectUser = async () => {
  await this.setState({redirect: false} );
};
addUserresponse = async (response, queryId, userHash, event) => {
    event.preventDefault();

    // Send the response to DB
    var payload = {
        "userHash": userHash,
        "queryId": queryId,
        "response": this.encryptMessage(response)
    };

    fetch('/responseToQuery', {
        method: "POST",
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify(payload)
    }).then((response) => response.json()).then(async (result) => {
        let decryptedQueryList = result.data.map( async obj => {
            obj.subject = await this.decryptMessage(obj.querySubject);
            obj.query = await this.decryptMessage(obj.queryBody);
            obj.location = await this.decryptMessage(obj.location);
            obj.response = await obj.response.map( async userResponses => {
                userResponses.response = await this.decryptMessage(userResponses.response);
               return userResponses;
           });
           return obj;
        });
        await this.setState({querylist: decryptedQueryList});
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
            <Route path="/" exact component={ () => <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/> }/>
            <Route path="/login" component={ () => <Login loggedIn={this.state.loggedIn} handleLogin={this.handleLogin}/> }/>
            <Route path="/sendquery" component={() => <SendQuery redirectUser={this.redirectUser} logoutUser={this.logoutUser} userHash={this.state.userHash} handleSendQuery={this.handleSendQuery} redirect={this.state.redirect}/>}/>
            <Route path="/QueryListTable" component={() => <QueryListTable logoutUser={this.logoutUser} querylist={this.state.querylist} userHash={this.state.userHash} toggleImportant={this.toggleImportant} toggleRead={this.toggleRead} />} />
            <Route path="/queryChatWindow" component={() => <QueryChatWindow logoutUser={this.logoutUser} userHash={this.state.userHash} querylist={this.state.querylist} addUserresponse={this.addUserresponse}/>}/>
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
