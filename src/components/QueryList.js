import React, { Component } from "react";
import PropTypes from 'prop-types';
import MaterialTable, { MTableBodyRow } from 'material-table'
import { Link } from 'react-router-dom';
import { Button} from 'react-bootstrap';
import {connect} from "react-redux";
import {selectFeedback} from "../actions";
import {QueryItem} from "./QueryItem";

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
            onRowClick={async (event, rowData) => {
                await this.props.selectFeedback(rowData.id);
            }}
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
                    style={{textTransform: 'none',
                        color: 'white',
                        padding: '10px 16px',
                        textAlign: 'center',
                        marginRight: '10px',
                        marginBottom: '15px',
                        marginTop: '10px',
                        borderRadius: '10px',
                        backgroundColor: '#144c92',
                        fontSize: '15px',
                        boxShadow: '0 0 57px rgba(0,0,0,0.13)',
                        cursor: 'pointer',
                        border: 'none'}}
                    size="small"
                  >Reply
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
};

const mapStateToProps = state => ({
    selectedFeedback: state.selectedFeedback
});

const mapDispatchToProps = () => {
    return {
        selectFeedback
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps()
)(QueryList);
