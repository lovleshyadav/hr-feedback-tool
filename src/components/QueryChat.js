import React, { useState } from 'react'

function QueryChat() {

    function getStyleForChatWrapper(){
        return  {
            float: 'right',
            padding: '5px 10px',
            backgroundColor: 'rgb(60, 114, 167)',
            borderRadius: '10px'
        }
        // if(this.props.query.response.user==='normal'){
        //     return{
        //         backgroundColor: 'rgb(60, 114, 167)'
        //     }
        // }
        // else if(this.props.query.response.user==='admin'){
        //     return{
        //         backgroundColor: '#828282'
        //     }
        // }
    }

    function getStyleForChat(){
        return  {
            width: '60%',
            color: '#fff',
            padding: '5px',
            fontSize: '15px'
        }
    }

    return (
            <div className="queryChatWindow">
                <div className="queryResponse" style={getStyleForChatWrapper()}>
                    <p style={getStyleForChat()}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
                </div>
            </div>
    )
}

export default QueryChat;
