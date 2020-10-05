import React, { Component } from "react";
import QueryItem from './QueryItem';
import PropTypes from 'prop-types';
import DataTable from 'react-data-table-component';
import MaterialTable, { MTableBodyRow } from 'material-table'
import { Link } from 'react-router-dom';
import { Button} from 'react-bootstrap';

class QueryList extends Component {
    
    render() {
        // console.log(this.props.querylist);
        const data = this.props.querylist.slice(0).reverse();
        console.log(data);
        const columns = [
            {
                title: 'Date',
                field: 'date'
            },
            {
                title: 'Location',
                field: 'location'
                
            },
            {
                title: 'Subject',
                field: 'querySubject'
            },
            {
                title: 'Message',
                field: 'queryBody'
            }
        ];

        return (
        // <MaterialTable
        //     data={data}
        //     columns={columns}
        //     options={{
        //         filtering:true,
        //         exportButton: true,
        //         grouping: true,
        //         selection: true
        //     }}
        // />

        <MaterialTable
            title="My Query List"
            data={data}
            columns={columns}
            options={{
                filtering:true,
                exportButton: true,
                grouping: true,
                // selection: true
            }}
            // components={{
            //     Row: props => (
            //         <Link to={{
            //             pathname:'/queryChatWindow',
            //             queryresponse:{
            //                 response: this.props.query
            //             },
            //             userHash: this.props.userHash
            //         }} >
            //             <div style={{ backgroundColor: '#e8eaf5' }}>
            //                 <MTableBodyRow {...props} />
            //             </div>
            //         </Link>
            //     )
            // }}
            actions={[
                {
                  icon: 'save',
                  tooltip: 'Save User',
                  onClick: (event, rowData) => alert("You saved " + rowData.name)
                }
              ]}
            components={{
                Action: props => (
                    <Link to={{
                        pathname:'/queryChatWindow',
                        queryresponse:{
                            response: this.props.query
                        },
                        userHash: this.props.userHash
                    }} >
                  <Button
                    color="primary"
                    variant="contained"
                    style={{textTransform: 'none'}}
                    size="small"
                  >
                    Go To conversation
                  </Button>
                  </Link>
                ),
              }}
        />
        );
    }
}

QueryList.propTypes = {
    querylist: PropTypes.array.isRequired
}

export default QueryList;
