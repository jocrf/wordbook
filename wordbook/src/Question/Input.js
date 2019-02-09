import React, { Component } from 'react';

export default class Input extends Component {
  render () {
    const { option, prompt, chosenAnswer, correctAnswer, showAnswers } = this.props;
    return (
      <React.Fragment>
        <input type='radio' id={option} value={option} name={prompt} checked={option === chosenAnswer} required />
        <label htmlFor={option} className={'btn btn-outline-primary' + (showAnswers && correctAnswer === option ? ' correctAnswer' : '') +
        (showAnswers && chosenAnswer === option && correctAnswer !== option ? ' wrongAnswer' : '')
        }>
          {/* show 'word' for review test, answer option otherwise */}
          {this.props.word ? this.props.word : option}
        </label>
      </React.Fragment>
    );
  }
}
