import React, { Component } from 'react';

export default class QuestionWrapper extends Component {
  constructor (props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler (e) {
    e.preventDefault();
    this.props.onButtonClick();
  }

  render () {
    const buttonColorClass = this.props.buttonText === 'Next' ? 'btn-secondary' : 'btn-primary';
    return (
      <React.Fragment>
        <form onSubmit={this.submitHandler} className='col-lg flex-lg-shrink-1'>
          {this.props.children}
          {this.props.showAnswers && !this.props.placement && this.props.type !== 'mc-one' && this.props.type !== 'fitb' &&
            <div className='card'>
              <p className='card-text p-3'>You got {this.props.numQuestions - this.props.wrongAnswers} correct out of {this.props.numQuestions}. Click on any of the words in the questions above to see the definition again.</p>
            </div>
          }
          <button className={`btn ${buttonColorClass}`}>{this.props.buttonText}</button>
        </form>
      </React.Fragment>
    );
  }
}
