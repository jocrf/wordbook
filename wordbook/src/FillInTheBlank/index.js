import React, { Component } from 'react';
import Wordlist from './Wordlist';

export default class FillInTheBlank extends Component {
  render () {
    const { part1, part2, onChange, wordlist, correctAnswer } = this.props;
    return (
      <React.Fragment>
        {/* is this re-rendering each time? */}
        <Wordlist
          wordlist={wordlist}
          onChange={onChange}
          prompt={part1}
          correct={correctAnswer}
          value={this.props.value}
        />
        <p>{part1} <span className='wordBlank text-center px-3'>
          {
            this.props.value && `${this.props.value.toUpperCase()}`
          }
          </span> {part2}</p>
      </React.Fragment>
    );
  }
}
