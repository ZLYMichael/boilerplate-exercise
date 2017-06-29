import React, {Component} from 'react'

class Message extends Component {
//if else statement here

render () {
  let message;
  if(this.props.type === "incomingMessage") {
    console.log("incomingMessage")
    message = (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content"> {this.props.content}</span>
      </div>)
  } 
  if(this.props.type === "incomingNotification") {
    console.log('incomingNotification')
    message = (        
    <div className="message system">
      {this.props.content}  
    </div>)
  }
  return (
    <div>
      {message}
    </div>
  );
  }
}

export default Message;