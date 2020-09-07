import React, {Component} from 'react';
import Login from './components/Login';
import SendQuery from './components/SendQuery';
import QueryList from './components/QueryList';

import './App.css';

class App extends Component {

  state = {
      querylist: []
  }

    componentDidMount() {
        // Call our fetch function below once the component mounts
        this.callBackendAPI()
            .then(res => this.setState({querylist: res.data}))
            .catch(err => console.log(err));
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

  render(){
      console.log(this.state.querylist);
    return (
      <div className="App">
         {/*<div className="queryList"><QueryList querylist={this.state.querylist} toggleImportant={this.toggleImportant} toggleRead={this.toggleRead}/></div>*/}
        {/*<Login />*/}
         <SendQuery />
      </div>
    );
  }
  
}

export default App;
