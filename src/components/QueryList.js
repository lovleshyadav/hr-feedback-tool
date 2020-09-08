import React, { Component } from "react";
import QueryItem from './QueryItem';
import PropTypes from 'prop-types';

class QueryList extends Component {
    
    render() {
            return this.props.querylist.map((query, index) => (
                <div>
                    <QueryItem key={query.id} query={query} index={index+1} toggleImportant={this.props.toggleImportant} toggleRead={this.props.toggleRead} />
                 </div>
            ));
    }
}

QueryList.propTypes = {
    querylist: PropTypes.array.isRequired
}

export default QueryList;
