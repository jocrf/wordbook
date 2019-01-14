import React, { Component } from 'react';

export default class FillInTheBlank extends Component {
  render () {
    const { part1, part2 } = this.props;
    return (
      <React.Fragment>
        <p>{part1}</p>
        ___________
        <p>{part2}</p>
      </React.Fragment>
    );
  }
}
