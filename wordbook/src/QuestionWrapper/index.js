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
            <p className='card-text pt-3 pb-3'>Click on any of the words in the questions above to see the definition again.</p>
          }
          <button className={`btn ${buttonColorClass}`}>{this.props.buttonText}</button>
        </form>
      </React.Fragment>
    );
  }
}
