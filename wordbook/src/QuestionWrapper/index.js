import React, { Component } from 'react';

export default class QuestionWrapper extends Component {
  constructor (props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  // check all children for correctness
  submitHandler (e) {
    e.preventDefault();
    this.props.onButtonClick();
  }

  render () {
    console.log(this.props.children);
    return (
      <React.Fragment>
        <form onSubmit={this.submitHandler}>
          {this.props.children}
          <button>{this.props.buttonText}</button>
        </form>
      </React.Fragment>
    );
  }
}
