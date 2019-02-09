import React, { Component } from 'react';

export default class Score extends Component {
  render () {
    return (
      <React.Fragment>
        {this.props.isCorrect &&
          <span>right</span>
        }
        {!this.props.isCorrect &&
          <span>wrong</span>
        }
      </React.Fragment>
    );
  }
}
