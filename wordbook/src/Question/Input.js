import React, { Component } from 'react';

export default class Input extends Component {
  render () {
    const { option, prompt, chosenAnswer, correctAnswer, showAnswers } = this.props;
    let optionText = option;
    if (this.props.id === 1) {
      option === 'true'
        ? optionText = 'yes'
        : optionText = 'no';
    }
    if (this.props.id === 2) {
      option === 'true'
        ? optionText = 'right'
        : optionText = 'wrong';
    }
    return (
      <React.Fragment>
        <input type='radio' id={option} value={option} name={prompt} checked={option === chosenAnswer} required />
        <label htmlFor={option} className={'btn btn-outline-primary' + (showAnswers && correctAnswer === option ? ' correctAnswer' : '') +
        (showAnswers && chosenAnswer === option && correctAnswer !== option ? ' wrongAnswer' : '')
        }>
          {/* show 'word' for review test, answer option otherwise */}
          {this.props.word ? this.props.word : optionText}
        </label>
      </React.Fragment>
    );
  }
}
