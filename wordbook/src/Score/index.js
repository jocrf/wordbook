import React, { Component } from 'react';

export default class Score extends Component {
  render () {
    return (
      <React.Fragment>
        {(this.props.correct || this.props.correctReview) &&
          <span>right</span>
        }
        {(!this.props.correct || this.props.correctReview) &&
          <span>wrong</span>
        }
      </React.Fragment>
    );
  }
}
