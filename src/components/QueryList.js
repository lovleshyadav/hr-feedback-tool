import React, { Component } from "react";
import QueryItem from './QueryItem';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import MaterialTable from 'material-table'

class QueryList extends Component {
    
    render() {
        // console.log(this.props.querylist);
        const data = this.props.querylist.slice(0).reverse();
        // console.log(this.props.querylist);
        // console.log("this is data");
        // console.log(data);
        const columns = [
        {
            title: 'location',
            field: 'location'
            
        },
        {
            title: 'queryBody',
            field: 'queryBody'
        },
        {
            title: 'querySubject',
            field: 'querySubject'
        }
        ];

        return (
        <MaterialTable
            data={data}
            columns={columns}
            options={{
                filtering:true,
                exportButton: true
            }}
        />
        );
    }
}

QueryList.propTypes = {
    querylist: PropTypes.array.isRequired
}

export default QueryList;
