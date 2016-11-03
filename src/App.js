import React from 'react';
import ReactDOM from 'react-dom';

import SubmitOnEnterForm from './components/SubmitOnEnterForm.jsx';

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
    let app;

    let loginForm = (
      <SubmitOnEnterForm
        placeholder="Enter your username"
        onSubmit={this.setUsername} />
    )

    let sharedChatRoom = (
      <div></div>
    )

    if (this.state.user) {
      app = sharedChatRoom;
    } else {
      app = loginForm;
    }

    return app;
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
