import React, { Component } from 'react';

export default class SingleQuestionWrapper extends Component {
  render () {
    return (
      <React.Fragment>
        {this.props.children}
        <button onChange={this.onChange}>Next</button>
      </React.Fragment>
    );
  }
}
