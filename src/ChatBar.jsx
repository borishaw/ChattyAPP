import React, {Component} from 'react';

export default class ChatBar extends Component {

  constructor(props){
    super(props);
    this.state = {
      username: this.props.currentUser.name,
      content: ''
    };
  }

  handleUsernameChange = (e) => {
    this.setState({username: e.target.value})
  };

  handleContentChange = (e) => {
    this.setState({content: e.target.value});
  }

  handelKeyPress = (e) => {
    if (e.key === 'Enter'){
      this.props.sendMessage(this.state);
      this.setState({content:''});
    }
  };

  render() {
    return (
      <footer className="chatbar">

        <input className="chatbar-username"
               value={this.state.username}
               onChange={this.handleUsernameChange}
               placeholder="Your Name (Optional) "/>

        <input className="chatbar-message"
               value={this.state.content}
               onChange={this.handleContentChange}
               onKeyPress={this.handelKeyPress}
               placeholder="Type a message and hit enter"
               />
      </footer>
    );
  }
}