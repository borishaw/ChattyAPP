import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';



export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [],
      notification: ""
    };
    this.ws = new WebSocket('ws://0.0.0.0:3001');
  }

  handleSendMessage = (newMessage) =>{
    if (newMessage.username !== this.state.currentUser.name){
      const newNotification = {
        type:"postNotification",
        content: `${this.state.currentUser.name} changed their name to ${newMessage.username}`
      };
      this.ws.send(JSON.stringify(newNotification));
      this.setState({currentUser: {name: newMessage.username}});
    }
    newMessage.type = "postMessage";
    this.ws.send(JSON.stringify(newMessage));
  };

  componentDidMount() {

    this.ws.onmessage = (e) => {
      const newMessage = JSON.parse(e.data);
      switch (newMessage.type){
        case "incomingMessage":
          this.state.messages.push(newMessage);
          this.setState({messages: this.state.messages});
          break;
        case "incomingNotification":
          this.setState({notification: newMessage.content});
          break;
        default:
          throw new Error("Unknown type :" + newMessage.type);
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar"><a href="/" className="navbar-brand">Chatty</a></nav>
        <MessageList messages={this.state.messages} notification={this.state.notification} />
        <ChatBar sendMessage={this.handleSendMessage} currentUser={this.state.currentUser} />
      </div>
    );
  }
}