import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

const currentUser = {
  currentUser: {name: 'Bob'}
};

const messages = [
  {
    id: 1,
    username: 'Bob',
    content: 'Has anyone seen my marbles?'
  },
  {
    id: 2,
    username: 'Anonymous',
    content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
  }
];

export default class App extends Component {

  constructor(props){
    super(props);
    this.state = {
      currentUser: currentUser,
      messages: messages};
  }

  handleInsertMessage = (newMessage) =>{
    newMessage.id = messages.length + 1;
    messages.push(newMessage);
    this.setState({
      messages: messages
    });
  }

  componentDidMount() {
    console.log("componentDidMount <App />");
    setTimeout(() => {
      console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages: messages})
    }, 3000);
  }

  render() {
    return (
      <div>
        <nav className="navbar"><a href="/" className="navbar-brand">Chatty</a></nav>
        <MessageList messages={this.state.messages} />
        <ChatBar insertMessage={this.handleInsertMessage}/>
      </div>
    );
  }
}