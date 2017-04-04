import React, {Component} from 'react';

export default class ChatBar extends Component {
  render() {
    console.log("Rendering Chatbar");
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional) "/>
        <input className="chatbar-message" placeholder="Type a message and hit enter"/>
      </footer>
    );
  }
}