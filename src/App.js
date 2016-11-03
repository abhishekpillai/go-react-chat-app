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
    fetch('/login', { method: 'POST', body: { username: username }})
      .then((response) => { return response.json(); })
      .then((json) => { this.setState({ user: json.user });  });
  }

  render () {
    return (
      <SubmitOnEnterForm
        placeholder="Enter your username"
        onSubmit={this.setUsername}
      />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
