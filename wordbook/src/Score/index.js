import React, { Component } from 'react';

export default class Score extends Component {
  componentDidMount () {
    if (this.props.placement && this.props.correctAnswer !== this.props.chosenAnswer) {
      this.props.markWrongAnswers();
    }
  }

  render () {
    return (
      <React.Fragment>
        <div>
          {
            (this.props.chosenAnswer === this.props.correctAnswer)
              ? <span className='score correctScore'><span className='font-italic'><u>{this.props.correctAnswer}</u></span> is correct</span>
              : <span className='score wrongScore'>The correct answer is <span className='font-italic'><u>{this.props.correctAnswer}</u></span></span>
          }
          {
            this.props.altAnswer &&
            <React.Fragment>
              <span>|</span>
              <span className='score correctScore'>
                <span className='font-italic'><u>{this.props.altAnswer} </u></span>
                 is also acceptable
              </span>
            </React.Fragment>
          }
        </div>
      </React.Fragment>
    );
  }
}
