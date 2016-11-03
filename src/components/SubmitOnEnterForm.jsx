import React from 'react';
import ReactDOM from 'react-dom';

class SubmitOnEnterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {value: ''};
    this.handleChange = this.handleChange.bind(this);
    this.handleOnKeyDown = this.handleOnKeyDown.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleOnKeyDown(event) {
    if (event.keyCode === 13 && this.state.value !== "") {
      this.props.onSubmit(this.state.value);
      this.setState({ value: '' });
    }
  }

  render() {
    return (
      <input
        type="text"
        placeholder={this.props.placeholder}
        value={this.state.value}
        onChange={this.handleChange}
        onKeyDown={this.handleOnKeyDown}
      />
    );
  }
}

module.exports = SubmitOnEnterForm;
