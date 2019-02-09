import React, { Component } from 'react';
import Input from './Input';

export default class Wordlist extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    this.props.onChange(this.props.prompt, e.target.value);
  }

  render () {
    return (
      <fieldset onChange={this.changeHandler} className='form-group'>
        <legend>Word list</legend>
        {this.props.wordlist.map(word =>
          <div key={word.word} className='form-check form-check-inline'>
            <Input
              option={word.answer}
              prompt={this.props.prompt}
              chosenAnswer={this.props.value}
              showAnswers={this.props.showAnswers}
              correctAnswer={this.props.correctAnswer}
              word={word.word}
            />
          </div>
        )}
      </fieldset>
    );
  }
}
