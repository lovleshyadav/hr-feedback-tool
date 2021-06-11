import React from 'react'

const GetHash = (props) => {
    return (
        <div className="hashWrapper">
            <p>Your Hash is: <span className="hash">{props.userHash}</span></p>
        </div>
    )
}

export default GetHash
