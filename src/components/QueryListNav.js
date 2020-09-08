import React, { Component } from 'react'

export class QueryListNav extends Component {
    render() {
        return (
            <div className="queryListHeading">
                <p className="serialNumberHeading">S. No.</p>
                <p className="subjectHeading" >Subject</p>
                <p className="bodyHeading">Body</p>
                <p className="statusHeading">Status</p>
                <p className="BtnHeading"></p>
                <p className="BtnHeading"></p>
            </div>
        )
    }
}
export default QueryListNav;
