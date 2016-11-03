import React from 'react';
import ReactDOM from 'react-dom';

import SubmitOnEnterForm from './SubmitOnEnterForm.jsx';

class ChatRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = { messages: [] };
    this.ws;
    this.initSocket = this.initSocket.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  initSocket () {
    this.ws = new WebSocket("ws://" + window.location.host + "/ws");
    this.ws.onmessage = (msg) => {
      this.state.messages.push(msg.data);
      this.setState({ messages: this.state.messages });
    }
  }

  componentDidMount () {
    fetch("/allMessages")
      .then((response) => { return response.json() })
      .then((data) => { this.setState({ messages: data.messages || [] }); });

    this.initSocket();
  }

  generateTimestamp () {
    var iso = new Date().toISOString();
    return iso.split("T")[1].split(".")[0];
  }

  sendMessage (message) {
    this.ws.send(
      JSON.stringify({
        userId: this.props.user.Id,
        content: (this.generateTimestamp() + " <" + this.props.user.Username + "> " + message)
      })
    );
  }

  render () {
    return (
      <div>
        <h3>Chat</h3>
        <pre className="chat-room">
          {this.state.messages.join('\n')}
        </pre>
        <SubmitOnEnterForm
          placeholder="speak your mind"
          onSubmit={this.sendMessage} />
      </div>
    )
  }
}

module.exports = ChatRoom;
