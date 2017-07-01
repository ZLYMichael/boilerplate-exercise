import React, {Component} from 'react';
import Message from './Message.jsx';

//selects all the 
class MessageList extends Component {
render () {
  console.log(this.props.randomColor);
  return (
    <div> 
    <main className="messages">
      {this.props.messages.map((msg, i) => {
      return (
        <Message color={msg.color} type={msg.type} key={i} username={msg.username} content={msg.content} />
      );
    })
  }
    </main>
    </div>
  )}
}

export default MessageList;