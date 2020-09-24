import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {connect} from "react-redux";
import {selectFeedback} from "../actions";

export class QueryItem extends Component {

    getStyleForQuery = () => {
        return {
            background: this.props.query.read ? '#f1f5f5': '#fff',
            boxShadow: 'inset 0 -1px 0 0 rgba(100,121,143,0.122)',
            padding: '10px 5px',
            transition: 'all ease 0.5s'
        }
    }

    getStyleForQuerySubject = () => {
        return {
            fontWeight: this.props.query.read ? '400' : '800',
            color: this.props.query.important ? 'red' : 'black'
        }
    }

    getStyleForStatus= () => {
        if(this.props.query.status==='pending'){
            return{
                backgroundColor: '#ef5350',
                border: '1px solid #b61827',
                color: '#fff'
            }
        }

        else if(this.props.query.status==='completed'){
            return{
                backgroundColor: '#4caf50',
                border: '1px solid #087f23',
                color: '#fff'
            }
        }
    }

    render() {
        const  { id, querySubject , queryBody, location, date} = this.props.query;
        const index = this.props.index;
        return (
            <Link to={{
                pathname:'/queryChatWindow',
                queryresponse:{
                    response: this.props.query
                },
                userHash: this.props.userHash
            }} >
                <ul style={this.getStyleForQuery()} onClick={async () => {
                    await this.props.selectFeedback(id);
                }}  className="queryItem">
                    <li>
                        <p className="queryIndex">{index+'.'}</p>
                        <p className="querydate">{date}</p>
                        <p className="querylocation">{location}</p>
                        <p className="querySubject" style={this.getStyleForQuerySubject()}>{querySubject}</p>
                        <p className="queryBody">{queryBody}</p>
                        {/* <p className="queryStatus" style={this.getStyleForStatus()}>{status}</p> */}
                        {/* <input type='button' className="listBtnImp" onClick={this.props.toggleImportant.bind(this, id)} value={'mark as '+ impBtnValue}/> */}
                        {/* <input type='button' className="listBtnRead" onClick={this.props.toggleRead.bind(this, id)} value={'mark as ' + readBtnValue}/> */}
                    </li>
                </ul>
                </Link>
        )
    }
}

QueryItem.propTypes = {
    query: PropTypes.object.isRequired
}

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
)(QueryItem);
