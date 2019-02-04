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
    const { wordlist, correct, value } = this.props;
    return (
      <fieldset onChange={this.changeHandler} className='form-group'>
        <legend>Word list</legend>
        {wordlist.map(word =>
          <div className='form-check form-check-inline'>
            <input type='radio' value={word.answer} name='wordlist' id={word.word} required checked={value === word.answer}/>
            <label key={word.word} for={word.word} className='btn btn-outline-primary'>
              {word.word}
            </label>
          </div>
        )}
      </fieldset>
    );
  }
}
