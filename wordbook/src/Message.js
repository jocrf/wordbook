import React, { Component } from 'react';

export default class Message extends Component {
  constructor (props) {
    super(props);
    this.messages = {
      correct: 'Correct!',
      incorrect: 'Incorrect.',
      readyMessage: 'Are you ready to start?'
    };
  }

  render () {
    const message = this.props.message;
    return (
      <p>{this.messages[message]}</p>
    );
  }
}
