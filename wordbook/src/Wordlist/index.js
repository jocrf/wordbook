import React, { Component } from 'react';

export default class Wordlist extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    this.props.onChange('answer', e.target.value);
  }

  render () {
    const { wordlist } = this.props;
    return (
      <fieldset onChange={this.changeHandler}>
        <legend>Word list</legend>
        {wordlist.map(word =>
          <label key={word}>
            <input type='radio' value={word} name='wordlist' required />
            {word}
          </label>
        )}
      </fieldset>
    );
  }
}
