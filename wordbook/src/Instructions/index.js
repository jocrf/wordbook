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
            <h3>Example question:</h3>
            <p>{exampleQuestion}</p>
            <h3>Answer:</h3>
            <p>{exampleAnswer}</p>
          </React.Fragment>
        }
      </React.Fragment>
    );
  }
}
