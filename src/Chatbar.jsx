import React, {Component} from 'react';

class Chatbar extends Component {
  constructor(props) {
    super(props);
    this.keypress =this.keypress.bind(this)
    this.updateText = this.updateText.bind(this)
    this.state = {text: ""};
  }
  keypress(event) {
    if (event.keyCode === 13) {
      this.props.sendMsg(event.target.value)
      this.setState({text: ""})
    }
  }

  updateText(event) {
    this.setState({ text: event.target.value })
  }
  
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser} type = "text" placeholder="Your Name (Optional)" />
        <input value={this.state.text} id="msg" className="chatbar-message" placeholder="Type a message and hit ENTER" type = "text" onKeyUp={this.keypress} onChange={this.updateText} />
      </footer>
    )
  }
}


export default Chatbar;