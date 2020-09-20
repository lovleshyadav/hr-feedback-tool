import React from 'react'
import {BrowserRouter as Router, NavLink } from 'react-router-dom';
import QueryListTable from './QueryListTable';

function NavBar() {
    return (
        <div className="NavBarWrapper">
            <div className="NavBar">
                <NavLink className="NavItems"  to="/sendquery" activeStyle={{color: '#fff', background: '#3c72a7'}}>To Send query</NavLink>
                <NavLink className="NavItems" to='/QueryListTable' activeStyle={{color: '#fff', background: '#3c72a7'}} render={props => (<QueryListTable {...props} querylist={this.state.querylist}/>)}>To query list</NavLink>
            </div>
        </div>
    )
}

export default NavBar;