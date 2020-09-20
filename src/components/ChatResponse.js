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
                width: '70%'
            }
        }

        else if(this.props.response.user==='admin'){
            return{
                color: '#fff',
                fontSize: '15px',
                padding: '5px 10px',
                backgroundColor: '#797979',
                borderRadius: '10px',
                width: '70%',
                float: 'left'
            }
        }
    }

    render() {
        // console.log(this.props.response);

        const  { response} = this.props.response;
        return (
            <div className="queryResponseWrapper" style={this.getStyleForChatWrapper()}>
                <div className="queryResponse">
                    <p style={this.getStyleForChat()}>{response}</p>
                </div>
            </div>
        )
    }
}

export default ChatResponse
