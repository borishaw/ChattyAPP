import React, {Component} from 'react';
import Message from './Message.jsx';

export default class MessageList extends Component {
  render(){
    return (
      <main className="messages">
        {this.props.messages.map(function(message){
          return <Message message={message} key={message.id}/>
        })}
        <div className="message system">{this.props.notification}</div>
      </main>
    );
  }
}