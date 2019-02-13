import React, { Component } from 'react';

export default class Score extends Component {
  render () {
    return (
      <React.Fragment>
        {
          (this.props.chosenAnswer === this.props.correctAnswer)
            ? <span className='score correctScore'><span className='font-italic'><u>{this.props.correctAnswer}</u></span> is correct</span>
            : <span className='score wrongScore'>The correct answer is <span className='font-italic'><u>{this.props.correctAnswer}</u></span></span>
        }
      </React.Fragment>
    );
  }
}
