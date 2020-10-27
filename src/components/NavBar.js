import React from 'react'
import { NavLink } from 'react-router-dom';
import QueryListTable from './QueryListTable';
import SendQuery from './SendQuery';

function NavBar(userHash) {
    return (
        <div className="NavBarWrapper">
            <div className="NavBar" style={{display: (userHash.userHash === "d82494f05d6917ba02f7aaa29689ccb444bb73f20380876cb05d1f37537b7892")?"none":"inline-flex"}}>
                <NavLink className="NavItems"  to="/sendquery" activeStyle={{color: '#fff', background: '#3c72a7'}} render={props => (<SendQuery redirect={false}/>)}>Send Query</NavLink>
                <NavLink className="NavItems" to='/QueryListTable' activeStyle={{color: '#fff', background: '#3c72a7'}} render={props => (<QueryListTable {...props} querylist={this.state.querylist}/>)}>My Query List</NavLink>
            </div>
        </div>
    )
}

export default NavBar;