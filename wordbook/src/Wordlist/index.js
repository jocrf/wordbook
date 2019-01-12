import React, { Component } from 'react';

export default class Wordlist extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    console.log('clicked ' + e.target.value);
    this.props.onChange(null, e.target.value);
  }

  render () {
    const { wordlist } = this.props;
    return (
      <select name='wordlist' onChange={this.changeHandler}>
        <option key='default' value='null'>Select one</option>
        {wordlist.map(word => (
          <option key={word} value={word}>{word}</option>
        ))}
      </select>
    );
  }
}
