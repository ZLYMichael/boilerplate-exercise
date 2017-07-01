import React, {Component} from 'react'

class Message extends Component {
//seperates by type

render () {
  console.log(this.props.color)
  const uniqueColor = {
    color: this.props.color
  }
  
  console.log(uniqueColor);
  let message;
  if(this.props.type === "incomingMessage") {
    console.log("incomingMessage")
    message = (
      <div className="message">
        <span style={uniqueColor} className="message-username">{this.props.username}</span>
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