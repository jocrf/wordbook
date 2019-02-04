import React, { Component } from 'react';
import Wordlist from './Wordlist';

export default class FillInTheBlank extends Component {
  render () {
    const { part1, part2, onChange, wordlist, correct } = this.props;
    return (
      <React.Fragment>
        <Wordlist
          wordlist={wordlist}
          onChange={onChange}
          prompt={part1}
          correct={correct}
        />
        <p>{part1} <span>{`${this.props.value}` || '_____________'}</span> {part2}</p>
      </React.Fragment>
    );
  }
}
