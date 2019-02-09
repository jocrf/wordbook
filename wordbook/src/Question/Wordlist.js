import React, { Component } from 'react';

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
            <input type='radio' value={word.answer} name='wordlist' id={word.word} required checked={word.answer === this.props.value} />
            <label htmlFor={word.word} className={'btn btn-outline-primary' + (this.props.showAnswers && this.props.correctAnswer === word.answer ? ' correctAnswer' : '')}>
              {word.word}
            </label>
          </div>
        )}
      </fieldset>
    );
  }
}
