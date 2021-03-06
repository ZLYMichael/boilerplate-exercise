import React, {Component} from 'react';
import MessageList from './MessageList.jsx';
import Chatbar from './Chatbar.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.socket = new WebSocket('ws://localhost:3001/')
    this.sendMsg = this.sendMsg.bind(this);
    this.changeName = this.changeName.bind(this);
    this.socket.onmessage = (event) => {
      console.log(event.data)
      const newMessage = JSON.parse(event.data);
      if(newMessage.type === 'userCount') {
        console.log("incoming User count: ", newMessage.count, this.state.currentUser)
        this.setState({
          userCount: newMessage.count})
          console.log(this.state.currentUser.name)
      } else {
        const messages = this.state.messages.concat(newMessage)
        this.setState({messages: messages});
      }
    }
  } //end of constructor

  state = {  
      currentUser: {name: "Anon", color: ""},
      messages: [],
      userCount: 0,
      };
   

  componentDidMount() {
    this.setState({
      currentUser: {name: "Anon" },
      messages: []
    });
  }
  sendMsg(content) {
    console.log("key pressed", content);
    const newMessage = {type: "postMessage", username: this.state.currentUser.name, content: content}
    this.socket.send(JSON.stringify(newMessage));
  }

  changeName(newName) {
    const originalName = this.state.currentUser.name;
    this.setState({currentUser: {
      name: newName,
    }});
    this.socket.send(JSON.stringify(
      {type: "postNotification", content: `${originalName} changed their name to ${newName}`}
    ))
  }


  render() {
    return (
      <div>
        <nav className="navbar">
          <span> {this.state.userCount} Users Online </span>
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList 
        messages={this.state.messages}
        />
        <Chatbar 
          currentUser={this.state.currentUser}
          sendMsg={this.sendMsg} 
          changeName={this.changeName}
         />
      </div>
    );
  }
}
export default App;
