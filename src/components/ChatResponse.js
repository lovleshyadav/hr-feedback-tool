import React, { Component } from 'react'

class ChatResponse extends Component {

    getStyleForChatWrapper = () =>{

        if(this.props.response.user==='normal'){
            return{
                display: 'flex',
                justifyContent: 'flex-end',
                marginBottom: '10px'
            }
        }

        else if(this.props.response.user==='admin'){
            return{
                display: 'flex',
                marginBottom: '10px'
            }
        }
    }

    getStyleForChat = () =>{

        if(this.props.response.user==='normal'){
            return{
                color: '#fff',
                fontSize: '15px',
                padding: '5px 10px',
                backgroundColor: '#3c72a7',
                borderRadius: '10px',
                float: 'right',
                display: 'flex',
                flexDirection: 'column'
            }
        }

        else if(this.props.response.user==='admin'){
            return{
                color: '#fff',
                fontSize: '15px',
                padding: '5px 10px',
                backgroundColor: '#797979',
                borderRadius: '10px',
                float: 'left',
                display: 'flex',
                flexDirection: 'column'
            }
        }
    }

    render() {
        console.log(this.props.response);

        const  { response, time, date} = this.props.response;
        return (
            <div className="queryResponseWrapper" style={this.getStyleForChatWrapper()}>
                <div className="queryResponse">
        <p style={this.getStyleForChat()}>{response}<span className="chatDateTime">{date} {time}</span></p>
                </div>
            </div>
        )
    }
}

export default ChatResponse
