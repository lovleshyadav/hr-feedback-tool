import React, { Component } from 'react'
import QueryListNav from './QueryListNav';
import QueryList from './QueryList';

export class QueryListTable extends Component {
    render() {
        return (
            // <div>
            //     <QueryListNav/>
            //     <div className="queryList"><QueryList querylist={this.props.querylist} toggleImportant={this.props.toggleImportant} toggleRead={this.props.toggleRead}/></div>
            // </div>

            <div className="queryList">
                <QueryListNav/>
                <QueryList querylist={this.props.querylist} toggleImportant={this.props.toggleImportant} toggleRead={this.props.toggleRead}/>
            </div>
        )
    }
}

export default QueryListTable;
