import React, { Component } from 'react';
import Question from './Question.js';

class QuizContainer extends Component {

  render () {
    const { instructions, questions } = this.props;
    return (
      <React.Fragment>
        <h1>Instructions</h1>
        <p>{instructions}</p>
        <ul>
          {questions.map(question =>
            <li key={question.prompt.slice(0,4)}>
              <Question
                prompt={question.prompt}
                answers={question.answers}
              />
            </li>
          )}
        </ul>
      </React.Fragment>
    )
  }
}

export default QuizContainer;
