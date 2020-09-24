import React from 'react'
import {BrowserRouter as Router, NavLink } from 'react-router-dom';
import QueryListTable from './QueryListTable';

function NavBar(userHash) {
    return (
        <div className="NavBarWrapper">
            <div className="NavBar" style={{display: (userHash.userHash === "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892")?"none":"inline-flex"}}>
                <NavLink className="NavItems"  to="/sendquery" activeStyle={{color: '#fff', background: '#3c72a7'}}>Send Query</NavLink>
                <NavLink className="NavItems" to='/QueryListTable' activeStyle={{color: '#fff', background: '#3c72a7'}} render={props => (<QueryListTable {...props} querylist={this.state.querylist}/>)}>My Query List</NavLink>
            </div>
        </div>
    )
}

export default NavBar;