import React from 'react';
import ReactDOM from 'react-dom';

import SubmitOnEnterForm from './components/SubmitOnEnterForm.jsx';
import ChatRoom from './components/ChatRoom.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {user: null};
    this.setUsername = this.setUsername.bind(this);
  }

  setUsername(username) {
    fetch('/login', {
      method: 'POST',
      headers: {
        "Content-type": "application/x-www-form-urlencoded; charset=UTF-8"
      },
      body: 'username='+username
    })
      .then((response) => { return response.json(); })
      .then((json) => { this.setState({ user: json.user }); });
  }

  render () {
    let loginForm = (
      // set propTypes in this component
      <div>
        <h1>Login</h1>
        <SubmitOnEnterForm
          placeholder="Enter your username"
          onSubmit={this.setUsername} />
      </div>
    )

    let sharedChatRoom = <ChatRoom user={this.state.user} />

    if (this.state.user) {
      return sharedChatRoom;
    } else {
      return loginForm;
    }
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
