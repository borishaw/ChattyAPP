import React, {Component} from 'react';

export default class Message extends Component {

  render() {
    return (
      <div className="message">
        <span className="message-username" style={{color: this.props.message.userNameColor}}>{this.props.message.username}</span>
        <span className="message-content">{this.props.message.content}</span>
      </div>
    );
  }
}