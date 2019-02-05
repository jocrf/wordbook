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
    return (
      <React.Fragment>
        <form onSubmit={this.submitHandler} className='col-lg flex-lg-shrink-1'>
          {this.props.children}
          <button className='btn btn-primary'>{this.props.buttonText}</button>
        </form>
      </React.Fragment>
    );
  }
}
