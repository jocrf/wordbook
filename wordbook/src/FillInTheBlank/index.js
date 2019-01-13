import React, { Component } from 'react';

export default class FillInTheBlank extends Component {
  constructor (props) {
    super(props);
    this.changeHandler = this.changeHandler.bind(this);
  }

  changeHandler (e) {
    this.props.onChange(this.props.prompt, e.target.value);
  }

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
