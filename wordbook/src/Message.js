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
        text: 'You placed into Level #. Are you ready to start learning?',
        buttonText: 'I\'m ready.'
      },
      quizOverPass: {
        text: 'You placed out of this level! Ready to start the next placement quiz for Level #?',
        buttonText: 'Ready to keep quizzing!'
      }
    };
  }

  render () {
    let messageText = this.messages[this.props.message].text;
    const buttonText = this.messages[this.props.message].buttonText;
    let level = 0;
    if ('level' in this.props) {
      level = this.props.level + 1; // need to correct for zero-indexed levels
      messageText = messageText.replace(/#/, level);
    }
    return (
      <React.Fragment>
        <p>{messageText}</p>
        {this.props.buttonAction &&
          <button onClick={this.props.buttonAction}>
            {buttonText}
          </button>
        }
      </React.Fragment>
    );
  }
}
