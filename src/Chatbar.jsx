import React, {Component} from 'react';

class Chatbar extends Component {
  render() {
    return (
      <footer className="chatbar">
        <input className="chatbar-username" defaultValue={this.props.currentUser} placeholder="Your Name (Optional)" />
        <input className="chatbar-message" placeholder="Type a message and hit ENTER" type = "text" onKeyUp={this.props.sendMsg} />
      </footer>
    )
  }
}


export default Chatbar;