import React, { Component } from 'react';

export default class Instructions extends Component {
  render () {
    const { title, instructions, exampleQuestion, exampleAnswer } = this.props;
    return (
      <React.Fragment>
        <h1 className='text-primary'>{title}</h1>
        <hr className='my-4' />
        <div className='instructions'>
          <p>{instructions}</p>
          {exampleQuestion &&
            <React.Fragment>
              <p className='font-weight-lighter'>
                <span className='font-italic'>Example question:</span> {exampleQuestion}
              </p>
              <p className='font-weight-lighter'>
                <span className='font-italic'>Answer:</span> {exampleAnswer}
              </p>
            </React.Fragment>
          }
        </div>
        <hr className='my-4' />
      </React.Fragment>
    );
  }
}
