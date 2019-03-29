import React, { Component } from 'react';
import Wordlist from './Wordlist';
import Score from '../Score';

export default class FillInTheBlank extends Component {
  render () {
    const { part1, part2, onChange, wordlist, correctAnswer, isCorrect } = this.props;
    return (
      <React.Fragment>
        {/* is this re-rendering each time? */}
        <Wordlist
          wordlist={wordlist}
          isCorrect={isCorrect}
          onChange={onChange}
          prompt={this.props.reviewPrompt}
          correctAnswer={correctAnswer}
          value={this.props.value}
          showAnswers={this.props.showAnswers}
        />
        {/* show score component on the checked answer */}
        {this.props.showAnswers &&
          <Score
            markWrongAnswers={this.props.markWrongAnswers}
            type={this.props.type}
            altAnswer={this.props.altAnswer}
            chosenAnswer={this.props.value}
            correctAnswer={this.props.correctAnswer}
          />
        }
        {/* TODO: add onClick toggleDefinition method, but need to get all definitions for all three chapters first */}
        <p>{part1} <span className='wordBlank text-center px-3'>
          {
            this.props.value && `${this.props.value}`
          }
        </span> {part2}</p>
      </React.Fragment>
    );
  }
}
