import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob", color: ''},
      messages: [],
      notification: "",
      numberOfOnlineUsers: 0
    };
    this.ws = new WebSocket('ws://0.0.0.0:3001');

    this.wrapImg = (str) => {
      let stringArray = str.split(" ");
      let imgUrlRegEx = new RegExp("/\.(gif|jpg|jpeg|tiff|png)$/i");
    }
  }

  handleSendMessage = (newMessage) => {
    if (newMessage.username !== this.state.currentUser.name) {
      const newNotification = {
        type: "postNotification",
        content: `${this.state.currentUser.name} changed their name to ${newMessage.username}`
      };
      this.ws.send(JSON.stringify(newNotification));
      this.setState({
        currentUser: {
          name: newMessage.username,
          color: this.state.currentUser.color
        }
      });
    }
    newMessage.type = "postMessage";
    newMessage.userNameColor = this.state.currentUser.color;
    this.ws.send(JSON.stringify(newMessage));
  };

  componentDidMount() {

    this.ws.onmessage = (e) => {
      const newMessage = JSON.parse(e.data);
      switch (newMessage.type) {
        case "incomingMessage":
          this.state.messages.push(newMessage);
          this.setState({messages: this.state.messages});
          break;
        case "incomingNotification":
          this.setState({notification: newMessage.content});
          break;
        case "numberOfOnlineUsers":
          this.setState({numberOfOnlineUsers: newMessage.content});
          break;
        case "userColor":
          this.setState({
            currentUser: {
              name: this.state.currentUser.name,
              color: newMessage.content
            }
          });
          break;
        default:
          throw new Error("Unknown type :" + newMessage.type);
      }
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="numberOfUsers">{this.state.numberOfOnlineUsers} user(s) online</span>
        </nav>
        <MessageList messages={this.state.messages} notification={this.state.notification}/>
        <ChatBar sendMessage={this.handleSendMessage} currentUser={this.state.currentUser}/>
      </div>
    );
  }
}