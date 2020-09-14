import React, { Component } from 'react'
import QueryListNav from './QueryListNav';
import QueryList from './QueryList';

class QueryListTable extends Component {
    render() {
        return (
            <div className="queryList">
                <QueryListNav/>
                <QueryList querylist={this.props.querylist} toggleImportant={this.props.toggleImportant} toggleRead={this.props.toggleRead}/>
            </div>
        )
    }
}

export default QueryListTable;
