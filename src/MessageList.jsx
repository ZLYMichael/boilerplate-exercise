import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
render () {
  return (
    <div> 
    <main className="messages">
      {this.props.messages.map((msg, i) => {
      return (
        <Message key={i} username={msg.username} content={msg.content} />
      );
    })
  }
    </main>
    </div>
  )}
}

export default MessageList;