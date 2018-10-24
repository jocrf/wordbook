import React, { Component } from 'react';

class Question extends Component {

  render () {
    const { prompt, answers } = this.props;
    return (
      <React.Fragment>
        <label>{prompt}
          {answers.map(answer =>
            <React.Fragment key={answer.word}>
              <input type='radio' value={answer.word} name={prompt} key={answer.word} />
              {answer.word}
            </React.Fragment>
          )}
        </label>
      </React.Fragment>
    );
  }
}

export default Question;
