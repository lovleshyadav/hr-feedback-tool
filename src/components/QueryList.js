import React, { Component } from "react";
import QueryItem from './QueryItem';
import PropTypes from 'prop-types';

class QueryList extends Component {
    
    render() {
        // console.log(this.props.querylist);
        return this.props.querylist.slice(0).reverse().map((query, index) => (  //.slice(0).reverse() to reverse the array
            <div>
                <QueryItem key={query.id} query={query} index={index+1} userHash={this.props.userHash} toggleImportant={this.props.toggleImportant} toggleRead={this.props.toggleRead}/>
            </div>
        ));
    }
}

QueryList.propTypes = {
    querylist: PropTypes.array.isRequired
}

export default QueryList;
