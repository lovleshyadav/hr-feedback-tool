import React, { Component } from 'react'
import QueryListNav from './QueryListNav';
import QueryList from './QueryList';
import NavBar from './NavBar';
import { Link } from 'react-router-dom';

class QueryListTable extends Component {
    render() {
        return (
            <div>
                <Link onClick={async () => {await this.props.logoutUser()}} className="logoutBtn" to={{
                    pathname:'/login'
                }} >Log out!</Link>

                <NavBar userHash={this.props.userHash}/>
            <div className="queryList">
                <QueryListNav/>
                <QueryList querylist={this.props.querylist} userHash={this.props.userHash} toggleImportant={this.props.toggleImportant} toggleRead={this.props.toggleRead}/>
            </div>
            </div>
        )
    }
}

export default QueryListTable;
