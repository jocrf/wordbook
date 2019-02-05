import React, { Component } from 'react';

export default class Score extends Component {
  render () {
    return (
      <React.Fragment>
        {this.props.correct &&
          <span>check</span>
        }
        {!this.props.correct &&
          <span>wrong</span>
        }
      </React.Fragment>
    )
  }
}