import React, { Component } from 'react';

export default class Score extends Component {
  render () {
    return (
      <React.Fragment>
        {
          (this.props.chosenAnswer === this.props.correctAnswer)
            ? <span>right</span>
            : <span>wrong</span>
        }
      </React.Fragment>
    );
  }
}
