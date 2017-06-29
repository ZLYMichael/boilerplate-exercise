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
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages});
    }
  } //end of constructor

  state = {  
      currentUser: {name: "Bob"},
      messages: []
      };
   
    // componentDidMount() {
    //   console.log("componentDidMount <App />");
    //   setTimeout(() => {
    //     console.log("Simulating incoming message");
    //     // Add a new message to the list of messages in the data store
    //     const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //     const messages = this.state.messages.concat(newMessage)
    //     // Update the state of the app component.
    //     // Calling setState will trigger a call to render() in App and all child components.
    //     this.setState({messages: messages})
    //   }, 3000);
    // }

  componentDidMount() {
    this.setState({
      currentUser: {name: "Bob"},
      messages: []
    });
  }
  sendMsg(content) {
    console.log("key pressed", content);
    event.preventDefault();
    const newMessage = {id: null, username: this.state.currentUser.name, content: content}
    this.socket.send(JSON.stringify(newMessage));
  }

  changeName(newName) {
    const originalName = this.state.currentUser.name;
    this.setState({currentUser: {
      name: newName
    }});
    this.socket.send(JSON.stringify(
    {"type": "postNotification", "content": `${originalName} changed their name to ${newName}`}
    ))
  }



  render() {
    console.log(this.state.messages);
    return (
      <div>
        <nav className="navbar">
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
