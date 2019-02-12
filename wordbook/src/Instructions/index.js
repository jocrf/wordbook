import React, { Component } from 'react';

export default class Instructions extends Component {
  render () {
    const { title, instructions, exampleQuestion, exampleAnswer } = this.props;
    return (
      <React.Fragment>
        <h2>{title}</h2>
        <p>{instructions}</p>
        {exampleQuestion &&
          <React.Fragment>
            <p>{exampleQuestion}</p>
            <p>{exampleAnswer}</p>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
