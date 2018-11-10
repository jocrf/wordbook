import React, { Component } from 'react';

export default class Message extends Component {
  constructor (props) {
    super(props);
    this.messages = {
      correct: {
        text: 'Correct!',
        buttonText: 'Next question'
      },
      incorrect: {
        text: 'Incorrect.',
        buttonText: 'Next question'
      },
      readyMessage: {
        text: 'Are you ready to start?',
        buttonText: 'Yes!'
      },
      quizOverFail: {
        text: 'This level looks like a good place for you to start. Are you ready to start learning?',
        buttonText: 'I\'m ready.'
      },
      quizOverPass: {
        text: 'You placed out of this level! Ready to start the next placement quiz level?',
        buttonText: 'Ready to keep quizzing!'
      }
    };
  }

  render () {
    const message = this.props.message;
    return (
      <React.Fragment>
        <p>{this.messages[message].text}</p>
        <button onClick={this.props.buttonAction}>{this.messages[message].buttonText}</button>
      </React.Fragment>
    );
  }
}
