import React, {Component} from 'react';
import Login from './components/Login';
import SendQuery from './components/SendQuery';
import QueryList from './components/QueryList';

import './App.css';

class App extends Component {

  state = {
    querylist: [
      {
        id: 1,
        read: false,
        important: false,
        querySubject: 'query 1',
        queryBody: 'query 1 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status: 'pending',
        impBtnValue:'important',
        readBtnValue:'read' 
      },
      {
        id: 2,
        read: false,
        important: false,
        querySubject: 'query 2',
        queryBody: 'query 2 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status: 'action taken',
        impBtnValue:'important',
        readBtnValue:'read'    
      },
      {
        id: 3,
        read: false,
        important: false,
        querySubject: 'query 3',
        queryBody: 'query 3 Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.',
        status: 'completed',
        impBtnValue:'important',
        readBtnValue:'read'
      }
    ]
  }

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
    return (
      <div className="App">
        {/* <div className="queryList"><QueryList querylist={this.state.querylist} toggleImportant={this.toggleImportant} toggleRead={this.toggleRead}/></div> */}
        <Login />
        {/* <SendQuery /> */}
      </div>
    );
  }
  
}

export default App;
