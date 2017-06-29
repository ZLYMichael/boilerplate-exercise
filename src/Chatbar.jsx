import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.keypress =this.keypress.bind(this);
    this.updateText = this.updateText.bind(this);
    this.nameChange = this.nameChange.bind(this);
    this.state = {text: ""};
  }
  keypress(event) {
    if (event.keyCode === 13) {
      this.props.sendMsg(event.target.value)
      this.setState({text: ""})
    }
  }
  
  nameChange(event) {
    if(event.keyCode === 13) {
      const newName = event.target.value;
      this.props.changeName(newName);
    }
  }

  updateText(event) {
    this.setState({ text: event.target.value })
  }
  
  render() {
    return (
      <footer className="chatbar">
          <input className="chatbar-username" defaultValue={this.props.currentUser.name} type = "text" placeholder="Your Name (Optional)" onKeyUp={this.nameChange} />
          <input value={this.state.text} id="msg" className="chatbar-message" placeholder="Type a message and hit ENTER" type = "text" onKeyUp={this.keypress} onChange={this.updateText} />
      </footer>
    )
  }
}


export default Chatbar;