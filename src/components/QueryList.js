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
        // console.log(data);
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

        <MaterialTable
            icons={{ Filter: () => <span className="material-icons MuiIcon-root MuiIcon-fontSizeSmall" aria-hidden="true" aria-describedby="mui-88980">search</span> }}
            title="My Query List"
            data={data}
            columns={columns}
            options={{
                filtering:true,
                exportButton: true,
                grouping: true,
                actionsColumnIndex: -1
            }}
            localization={{
                grouping: {
                    placeholder: 'Hi',
                    groupedBy: 'bye' 
                },
                pagination: {
                    labelDisplayedRows: '{from}-{to} of {count}'
                },
                toolbar: {
                    nRowsSelected: '{0} row(s) selected'
                },
                header: {
                    actions: ''
                },
                body: {
                    emptyDataSourceMessage: 'No records to display',
                    filterRow: {
                        filterTooltip: 'search'
                    }
                }
            }}
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
                        padding: '8px 14px',
                        textAlign: 'center',
                        marginRight: '10px',
                        marginBottom: '15px',
                        marginTop: '10px',
                        borderRadius: '10px',
                        backgroundColor: '#144c92',
                        fontSize: '13px',
                        boxShadow: '0 0 57px rgba(0,0,0,0.13)',
                        cursor: 'pointer',
                        border: 'none'}}
                    size="small"
                  >Go To Conversation
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
