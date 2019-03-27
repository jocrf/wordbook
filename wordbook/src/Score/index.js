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
        {
          this.props.type === 'tf' &&
          <div>
            {
              (this.props.chosenAnswer === this.props.correctAnswer)
                ? <span className='score correctScore font-italic'>correct</span>
                : <span className='score wrongScore font-italic'>incorrect</span>
            }
          </div>
        }
        <div>
          {
            this.props.type !== 'tf' &&
            <span>
              {
                (this.props.chosenAnswer === this.props.correctAnswer)
                  ? <span className='score correctScore'><span className='font-italic'><u>{this.props.correctAnswer}</u></span> is correct</span>
                  : <span className='score wrongScore'>The correct answer is <span className='font-italic'><u>{this.props.correctAnswer}</u></span></span>
              }
            </span>
          }
          {
            this.props.altAnswer &&
            <React.Fragment>
              <span>|</span>
              <span className='score correctScore'>
                <span className='font-italic'><u>{this.props.altAnswer} </u></span>
                  is also correct
              </span>
            </React.Fragment>
          }
        </div>
      </React.Fragment>
    );
  }
}
