import React, { Component } from 'react';

export default class QuestionWrapper extends Component {
  constructor (props) {
    super(props);
    this.submitHandler = this.submitHandler.bind(this);
  }

  submitHandler (e) {
    e.preventDefault();
    this.props.onNextClick();
  }

  render () {
    return (
      <React.Fragment>
        <form onSubmit={this.submitHandler}>
          {this.props.children}
          <button>Next</button>
        </form>
      </React.Fragment>
    );
  }
}
